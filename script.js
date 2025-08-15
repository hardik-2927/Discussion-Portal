let sub = document.querySelector("#subject");
        let question = document.querySelector("#question");
        let submit = document.querySelector("#sub");
        let out = document.querySelector("#out");
        let newq = document.querySelector("#new");
        let inp = document.querySelector("#input");
        let questions = JSON.parse(localStorage.getItem("questions")) || [];

        function saved() {
            localStorage.setItem("questions", JSON.stringify(questions));
        }

        function generateUniqueId() {
            return 'id-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
        }

        function ques() {
            out.innerHTML = "";
            questions.forEach((q, index) => {
                out.innerHTML += `
<div class="childs" data-index="${index}" style="height: 50px; background-color: white; margin-top: 10px; padding-top: 5px; border:2px solid black; border-radius:5px;">
    <h5 style="margin-left: 260px;">${q.subject}</h5>
    <p style="margin-top:10px ;">${q.question}</p>
</div>
                `;
            });
        }

        submit.addEventListener('click', () => {
            let newQuestion = {
                id: generateUniqueId(),
                subject: sub.value,
                question: question.value,
                responses: []
            };
            questions.push(newQuestion);
            saved();
            ques();
            sub.value = "";
            question.value = "";
        });

        newq.addEventListener('click', () => {
            inp.innerHTML = `  
                <h1>Welcome to Discussion Portal!</h1>
                <p>Enter a subject and question to get started</p>
                <div id="inputs">
                    <input type="text" name="subject" id="subject" placeholder="Enter Subject...">
                    <textarea name="question" id="question" placeholder="Enter Questions..."></textarea>
                </div>
                <button id="sub">Submit</button>
            `;
            sub = document.querySelector("#subject");
            question = document.querySelector("#question");
            submit = document.querySelector("#sub");
            submit.addEventListener('click', () => {
                let newQuestion = {
                    id: generateUniqueId(),
                    subject: sub.value,
                    question: question.value,
                    responses: []
                };
                questions.push(newQuestion);
                saved();
                ques();
                sub.value = "";
                question.value = "";
            });
        });

        out.addEventListener('click', (e) => {
            if (e.target.closest('.childs')) {
                let index = e.target.closest('.childs').dataset.index;
                let selectedQuestion = questions[index];

                inp.innerHTML = `
                    <div class="parents" id="response">
                        <h4>Question</h4>
                        <div id="res">
                            <h5>${selectedQuestion.subject}</h5>
                            <p>${selectedQuestion.question}</p>
                        </div>
                        <button id="res-btn">Resolve</button>
                        <h4>Responses</h4>
                        <div id="responses">
                            ${selectedQuestion.responses.map(r => `
                                <div class="hell">
                                    <h5>${r.name}</h5>
                                    <p>${r.text}</p>
                                </div>
                            `).join("")}
                        </div>
                        <h4>Add Response</h4>
                        <input type="text" name="name" id="name" placeholder="Enter Name">
                        <textarea name="respo" id="respo" placeholder="Enter your response...."></textarea>
                        <button class="res-sub" style="margin-top: 15px;">Submit</button>
                    </div>
                `;

                const res = inp.querySelector(".res-sub");
                const res_text = inp.querySelector("#respo");
                const res_input = inp.querySelector("#name");
                const responsesDiv = inp.querySelector("#responses");

                res.addEventListener('click', () => {
                    let new_res = {
                        name: res_input.value,
                        text: res_text.value
                    };
                    selectedQuestion.responses.push(new_res);
                    saved();
                    responsesDiv.innerHTML += `
                        <div class="hell">
                            <h5>${res_input.value}</h5>
                            <p>${res_text.value}</p>
                        </div>
                    `;
                    res_input.value = "";
                    res_text.value = "";
                });

                const resBtn = inp.querySelector("#res-btn");
                resBtn.addEventListener('click', () => {
                    questions.splice(index, 1);
                    saved();
                    ques();
                    inp.innerHTML = `  
                        <h1>Welcome to Discussion Portal!</h1>
                        <p>Enter a subject and question to get started</p>
                        <div id="inputs">
                            <input type="text" name="subject" id="subject" placeholder="Enter Subject...">
                            <textarea name="question" id="question" placeholder="Enter Questions..."></textarea>
                        </div>
                        <button id="sub">Submit</button>
                    `;
                    sub = document.querySelector("#subject");
                    question = document.querySelector("#question");
                    submit = document.querySelector("#sub");
                    submit.addEventListener('click', () => {
                        let newQuestion = {
                            id: generateUniqueId(),
                            subject: sub.value,
                            question: question.value,
                            responses: []
                        };
                        questions.push(newQuestion);
                        saved();
                        ques();
                        sub.value = "";
                        question.value = "";
                    });
                });
            }
        });

        ques();