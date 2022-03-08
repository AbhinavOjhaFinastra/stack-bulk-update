$(document).ready(function() {
	var csvParsedArray = [];
	var progressWidth = 0;

    $("#sampleDownload").click(function (e) {
        e.preventDefault();
        window.location.href = "/stack-bulk-update/assets/samples/SampleUploadFile.csv";
    });

	$(document).on('submit', '#bulk-update-form', function(e) {
		e.preventDefault();

		$("input#clientId").removeClass("is-invalid");
		$("input#clientKey").removeClass("is-invalid");

        $("span#errorBadge").hide();
		$('#createdQues').empty();
        $('#failedQues').empty();
        $("div#uploadProgressDiv").hide();
        $("div#uploadProgress").width("0%");
        progressWidth = 0;

		let hostPort = location.port;
		if (hostPort) {
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

		$("form#bulk-update-form").change(function(e) {
		    console.log($(this));
//		    $(this).validate();
		})
	});

	function runCSVUpload(accessToken, requestKey) {
		if ($("#fileToUpload").get(0).files.length == 0) {
			alert("Please upload the file first.");
			return;
		}
		let fileUpload = $("#fileToUpload").get(0);
		let files = fileUpload.files;
		if (files[0].name.toLowerCase().lastIndexOf(".csv") == -1) {
			$("#fileToUpload").val("");
			return;
		}

		let reader = new FileReader();
		let bytes = 50000;

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
                let testGetQuestUrl = "https://finastra.stackenterprise.co/api/2.3/questions?fromdate=" + Date.now() + "&key=" + requestKey;
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

	function startCreatingQuestions(line_array, accessToken, requestKey, progressStep) {
	    for (let i = 0; i < line_array.length; i++) {
            let cellArr = line_array[i];

            if (cellArr && cellArr.length > 0 && cellArr[0] != "") {
                if (i != 0) {
                    createStackQuestion(cellArr, accessToken, requestKey, progressStep);
                }
            }
        }

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

	    let quesPostData = {
            title: questionData[0],
            body: questionData[1],
            tags: questionData[2],
            key: requestKey,
            preview: true,
            access_token: access_token
        };

        $.post("https://finastra.stackenterprise.co/api/2.3/questions/add", quesPostData, function(data, textStatus, jqXHR) {

            console.log(data);
            let quesLink = (data && data.link) ? data.link : "";
            let createdQuesHtml = '<tr><td>' + questionData[0] + '</td><td>' + questionData[1] + '</td><td>' + questionData[2] + '</td><td>' + quesLink + '</td></tr>';
            $('#createdQues').append(createdQuesHtml);
            progressWidth += progressStep;
            $("div#uploadProgress").width(progressWidth + "%");

        }).fail(function(jqXHR, textStatus, errorThrown) {

            $("span#errorBadge").show();
            let errorDetail = JSON.parse(jqXHR.responseText);
            let failedQuesHtml = '<tr><td>' + questionData[0] + '</td><td>' + questionData[1] + '</td><td>' + questionData[2] + '</td><td style="color: red;">' + errorDetail.error_message + '</td></tr>';
            $('#failedQues').append(failedQuesHtml);
            progressWidth += progressStep;
            $("div#uploadProgress").width(progressWidth + "%")
        });
	}

	function createStackAnswer(quesId, answerBody, access_token, requestKey, progressStep) {

	}
});