$(document).ready(function() {
	var csvParsedArray = [];
	var progressWidth = 0;

    $("#sampleDownload").click(function (e) {
        // This is to download sample file as template for bulk update
        e.preventDefault();
        window.location.href = "/stack-bulk-update/assets/samples/SampleUploadFile.csv";
    });

	$(document).on('submit', '#bulk-update-form', function(e) {
		e.preventDefault();

        // Clear out any invalidation when we submit form
		$("input#clientId").removeClass("is-invalid");
		$("input#clientKey").removeClass("is-invalid");

        // Hide the error badges when the form is submitted
        $("span#errorBadgeQues").hide();
        $("span#errorBadgeAns").hide();

        // Clear out the old data from the display tables
		$('#createdQues').empty();
        $('#failedQues').empty();
        $('#failedAns').empty();

        // Reset and hide the progress bar
        $("div#uploadProgressDiv").hide();
        $("div#uploadProgress").width("0%");
        progressWidth = 0;

		let hostPort = location.port;
		if (hostPort) {
		    // This is for local testing and will we removed later
            runCSVUpload("yIZdlAd54BPU73NmhkEWYA))", "wjD0jJU7EuKP3kGvJyhYvA((");
		} else {

			FSE.init({
				// Parameters obtained by registering an app, these are specific to the SE
				//   documentation site
				clientId: $('#clientId').val(),
				key: $('#clientKey').val(),
				// Used for cross domain communication, it will be validated
				channelUrl: 'https://abhinavojhafinastra.github.io/stack-bulk-update/',
				appDomain: 'https://abhinavojhafinastra.github.io',
				appBase: 'stack-bulk-update',
				// Called when all initialization is finished
				complete: function(data) {
					console.log(data);
				},
				error: function(data) {
					console.error('An error occurred:\n' + data.errorName + '\n' + data.errorMessage);
				}
			});

			// Make the authentication call, note that being in an onclick handler
			//   is important; most browsers will hide windows opened without a
			//   'click blessing'
			FSE.authenticate({
				success: function(data) {
					$('#generated-token').val(data.accessToken);
					runCSVUpload(data.accessToken, data.requestKey);
				},
				error: function(data) {
					console.error('An error occurred:\n' + data.errorName + '\n' + data.errorMessage);

					if (data.errorName == "WrongClientID") {
					    $("input#clientId").val("").addClass("is-invalid");
					}
				},
				scope: ['write_access']
			});
		}

//		$("form#bulk-update-form").change(function(e) {
//		    console.log($(this));
//		})
	});

	function runCSVUpload(accessToken, requestKey) {
		if ($("#fileToUpload").get(0).files.length == 0) {
			alert("Please upload the file first.");
			return;
		}
		let fileUpload = $("#fileToUpload").get(0);
		let files = fileUpload.files;

		// Check if the uploaded file is a CSV file or not
		if (files[0].name.toLowerCase().lastIndexOf(".csv") == -1) {
			$("#fileToUpload").val("");
			return;
		}

        // Initialize the file reader
		let reader = new FileReader();
		let bytes = 50000;

        // Event to start reading the file once loaded
		reader.onloadend = function(evt) {

			let lines = evt.target.result;
			if (lines && lines.length > 0) {
				let line_array = CSVToArray(lines);
				if (lines.length == bytes) {
					line_array = line_array.splice(0, line_array.length - 1);
				}
				var columnArray = [];
				var stringHeader = "<thead><tr>";
				var stringBody = "<tbody>";

                // Go through all the rows to determine the number of questions/posts to determine the progress bar step count
				let totalQues = 0;
				for (let i = 0; i < line_array.length; i++) {
                    let cellArr = line_array[i];
                    if (cellArr && cellArr.length > 0 && cellArr[0] != "") {
                        if (i != 0) {
                            totalQues++;
                        }
                    }
                }

				let progressStep = 0;

				if (totalQues > 0) {
				    progressStep = 100/totalQues;
				}

                // Making a get call to catch the error if the provided key is correct or not
                let testGetQuestUrl = "https://finastra.stackenterprise.co/api/2.3/questions?fromdate=" + Math.round(Date.now() / 1000) + "&key=" + requestKey;
                $.get(testGetQuestUrl, function(data, textStatus, jqXHR) {
                    // Making the final rest calls to start creating posts (questions/answers)
                    $("div#uploadProgressDiv").show();
                    startCreatingQuestions(line_array, accessToken, requestKey, progressStep);

                }).fail(function (jqxhr,settings,ex) {
                    $("input#clientKey").val("").addClass("is-invalid");
                });

//				console.log(csvParsedArray);
			}
		}

		let blob = files[0].slice(0, bytes);
		reader.readAsBinaryString(blob);
	}

    // Feed this method with each line of the CSV file to process the cell data
	function startCreatingQuestions(line_array, accessToken, requestKey, progressStep) {
	    for (let i = 0; i < line_array.length; i++) {
            let cellArr = line_array[i];

            if (cellArr && cellArr.length > 0 && cellArr[0] != "") {
                if (i != 0) {
                    createStackQuestion(cellArr, accessToken, requestKey, progressStep);
                }
            }
        }

        // Once the questions are being created, start showing the update results table
        $("#bulkUpdateResult").show();
	}

	function CSVToArray(strData, strDelimiter) {
		strDelimiter = (strDelimiter || ",");
		let objPattern = new RegExp(
			(
				"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
				"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
				"([^\"\\" + strDelimiter + "\\r\\n]*))"
			),
			"gi"
		);
		let arrData = [
			[]
		];
		let arrMatches = null;
		while (arrMatches = objPattern.exec(strData)) {
			let strMatchedDelimiter = arrMatches[1];
			let strMatchedValue = [];
			if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
				arrData.push([]);
			}
			if (arrMatches[2]) {
				strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
			} else {
				strMatchedValue = arrMatches[3];
			}
			arrData[arrData.length - 1].push(strMatchedValue);
		}
		return (arrData);
	}

	function createStackQuestion(questionData, access_token, requestKey, progressStep) {

        // Create a data for the post call of question
	    let quesPostData = {
            title: questionData[0],
            body: questionData[1],
            tags: questionData[2],
            key: requestKey,
            preview: true,
            access_token: access_token
        };

        $.post("https://finastra.stackenterprise.co/api/2.3/questions/add", quesPostData, function(data, textStatus, jqXHR) {

            // Since the question get successfully created, we need to check if answer is provided for the question in the file
            console.log(data);
            let quesLink = (data && data.link) ? data.link : "";

            if (questionData[3] && questionData[3] !== "") {
                // Create answer for the given question id and display the post
                createStackAnswer(quesId, questionData, quesLink, access_token, requestKey, progressStep);
            } else {
                // Only display the created questions as there is no answer given for this question
                displayCreatedQuesAns(questionData, quesLink, "", "", progressStep);
            }

        }).fail(function(jqXHR, textStatus, errorThrown) {
            displayFailedQues(jqXHR, questionData, progressStep);
        });
	}

	function createStackAnswer(quesId, questionData, quesLink, access_token, requestKey, progressStep) {
	    let answerBody = questionData[3];
        let answerPostData = {
            body: answerBody,
            key: requestKey,
            preview: true,
            access_token: access_token
        };

        $.post("https://finastra.stackenterprise.co/api/2.3/questions/" + quesId + "/answers/add", answerPostData, function(data, textStatus, jqXHR) {

             // Created answer for the given question id and displaying the post
            let ansLink = (data && data.link) ? data.link : "";
            displayCreatedQuesAns(questionData, quesLink, answerBody, ansLink, progressStep);

        }).fail(function(jqXHR, textStatus, errorThrown) {

            // Only display the created questions as there are errors in the given answer and will be displayed separately
            displayCreatedQuesAns(questionData, quesLink, "", "", progressStep);

            // Display the failed answers in a separate table tab
            displayFailedAns(jqXHR, quesId, questionData);
        });
	}

	function displayCreatedQuesAns(questionData, quesLink, answerBody, ansLink, progressStep) {

        let createdQuesHtml = '<tr><td>' + questionData[0] + '</td><td>' + questionData[1] + '</td><td>' +
                               questionData[2] + '</td><td>' + quesLink + '</td><td>' + answerBody + '</td><td>' + ansLink + '</td></tr>';

        $('#createdQues').append(createdQuesHtml);
        progressWidth += progressStep;
        $("div#uploadProgress").width(progressWidth + "%");
	}

	function displayFailedQues(jqXHR, questionData, progressStep) {
	    $("span#errorBadgeQues").show();
        let errorDetail = JSON.parse(jqXHR.responseText);

        let failedQuesHtml = '<tr><td>' + questionData[0] + '</td><td>' + questionData[1] + '</td><td>' + questionData[2] +
                             '</td><td style="color: red;">' + errorDetail.error_message + '</td><td>' + questionData[3] + '</td></tr>';

        $('#failedQues').append(failedQuesHtml);
        progressWidth += progressStep;
        $("div#uploadProgress").width(progressWidth + "%");
	}

	function displayFailedAns(jqXHR, quesId, questionData) {
	    $("span#errorBadgeAns").show();
        let errorDetail = JSON.parse(jqXHR.responseText);

        let failedAnsHtml = '<tr><td>' + quesId + '</td><td>' + questionData[0] + '</td><td>' + questionData[3] +
                             '</td><td style="color: red;">' + errorDetail.error_message + '</td></tr>';

        $('#failedAns').append(failedQuesHtml);
    }
});