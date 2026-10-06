const form = document.getElementById("diabetesForm");

const loading = document.getElementById("loading");

const result = document.getElementById("result");

const predictButton = document.getElementById("predictButton");


form.addEventListener("submit", async function(event) {

    event.preventDefault();


    // Hide previous result

    result.classList.add("hidden");


    // Show loading

    loading.classList.remove("hidden");

    predictButton.disabled = true;


    // Get values from form

    const data = {

        Pregnancies:
            Number(document.getElementById("Pregnancies").value),

        Glucose:
            Number(document.getElementById("Glucose").value),

        BloodPressure:
            Number(document.getElementById("BloodPressure").value),

        SkinThickness:
            Number(document.getElementById("SkinThickness").value),

        Insulin:
            Number(document.getElementById("Insulin").value),

        BMI:
            Number(document.getElementById("BMI").value),

        DiabetesPedigreeFunction:
            Number(
                document.getElementById(
                    "DiabetesPedigreeFunction"
                ).value
            ),

        Age:
            Number(document.getElementById("Age").value)

    };


    try {

        // Send request to FastAPI

        const response = await fetch(
            "http://127.0.0.1:8000/predict",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(data)

            }
        );


        if (!response.ok) {

            throw new Error("API request failed");

        }


        const resultData = await response.json();


        // Display result

        showResult(resultData);


    } catch (error) {

        alert(
            "Unable to connect to the backend. " +
            "Please make sure FastAPI is running."
        );

        console.error(error);

    }


    loading.classList.add("hidden");

    predictButton.disabled = false;

});


function showResult(data) {

    const resultTitle =
        document.getElementById("resultTitle");

    const resultMessage =
        document.getElementById("resultMessage");

    const probability =
        document.getElementById("probability");

    const progressBar =
        document.getElementById("progressBar");

    const resultIcon =
        document.getElementById("resultIcon");


    probability.innerText =
        data.probability + "%";


    progressBar.style.width =
        data.probability + "%";


    resultMessage.innerText =
        data.result;


    if (data.prediction === 0) {

        resultTitle.innerText =
            "Low Risk";

        resultIcon.innerText =
            "✓";

        resultIcon.style.background =
            "#d8f3dc";

    } else {

        resultTitle.innerText =
            "Possible Risk";

        resultIcon.innerText =
            "!";

        resultIcon.style.background =
            "#ffe5e5";

    }


    result.classList.remove("hidden");


    result.scrollIntoView({

        behavior: "smooth"

    });

}


function resetForm() {

    result.classList.add("hidden");

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}