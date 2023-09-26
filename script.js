const cardList = document.getElementById('cardList');

const onClickAdd = () => {
    const textEl = document.getElementById("add-id");
    const text = textEl.value;

    var flag = 0;

    const cardListString = localStorage.getItem("card-list");
    if (cardListString) {
        const card_list = JSON.parse(cardListString);
        for (const cardText of card_list) {
            if (cardText == text) {
                flag = 1;
                break;
            }
        }

        if (flag == 0) {
            const newCard = createCard();
            cardList.appendChild(newCard);

            updateLocalStorage();

            createMemo();
        } else if (flag == 1) {
            createMemo();
        }else{
            console.log('error');
        }
    }
}

function createCard() {
    const textEl = document.getElementById("add-id");
    const title = textEl.value;

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('l-wrapper_02', 'card-radius_02');

    const card = document.createElement('article');
    card.classList.add('card_02');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card__header_02');

    const cardTitle = document.createElement('p');
    cardTitle.classList.add('card__title_02');
    cardTitle.textContent = title;

    const cardDelete = document.createElement("button");
    cardDelete.textContent = "削除";

    cardDelete.addEventListener("click", (event) => {
        if (event.target.matches("button")) {
            cardList.removeChild(cardWrapper);
            updateLocalStorage();
        }
    });

    const memoList = document.createElement('ul');
    memoList.id = title;

    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(cardDelete);
    card.appendChild(cardHeader);
    card.appendChild(memoList);
    cardWrapper.appendChild(card);

    return cardWrapper;
}

const createMemo = () => {
    const idEl = document.getElementById("add-id");
    const id = idEl.value;

    const textEl = document.getElementById("add-text");
    const text = textEl.value;
    textEl.value = "";

    const li = document.createElement("li");
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.textContent = text;

    const button = document.createElement("button");
    button.textContent = "削除";

    const btn = document.createElement("button"); // button要素取得
    btn.textContent = "COPY!";

    button.addEventListener("click", (event) => {
        if (event.target.matches("button")) {
            const deleteTarget = event.target.closest("li");
            if (deleteTarget) {
                document.getElementById(id).removeChild(deleteTarget);
                updateMemo();
            }
        }
    });

    btn.addEventListener("click", () => { // ボタンをクリックしたら
        navigator.clipboard
            .writeText(text) // テキストをクリップボードに書き込み（＝コピー）
            .then(
                (success) => console.log('テキストのコピーに成功'),
                (error) => console.log('テキストのコピーに失敗')
            );

        btn.innerHTML = "copied!"; // ボタンの文字変更
        setTimeout(() => (btn.innerHTML = "COPY!"), 2000); // ボタンの文字を戻す
    });

    div.appendChild(p);
    div.appendChild(button);
    div.appendChild(btn);
    li.appendChild(div);
    document.getElementById(id).appendChild(li);

    updateMemo();
};

document.getElementById("add-button").addEventListener("click", onClickAdd);

const updateLocalStorage = () => {
    const cardlist = Array.from(document.querySelectorAll("p.card__title_02")).map((p) => {
        return p.textContent;
    });
    localStorage.setItem("card-list", JSON.stringify(cardlist));
};

const updateMemo = () => {
    const idEl = document.getElementById("add-id");
    const id = idEl.value;

    const cardList = Array.from(document.getElementById(id).querySelectorAll("li")).map((li) => {
        return li.querySelector("p").textContent;
    });
    localStorage.setItem(id, JSON.stringify(cardList));
};

window.addEventListener("load", () => {
    const cardListString = localStorage.getItem("card-list");
    if (cardListString) {
        const cardList = JSON.parse(cardListString);
        for (const cardText of cardList) {
            const cardList = document.getElementById('cardList');

            const cardWrapper = document.createElement('div');
            cardWrapper.classList.add('l-wrapper_02', 'card-radius_02');

            const card = document.createElement('article');
            card.classList.add('card_02');

            const cardHeader = document.createElement('div');
            cardHeader.classList.add('card__header_02');

            const cardTitle = document.createElement('p');
            cardTitle.classList.add('card__title_02');
            cardTitle.textContent = cardText;

            const cardDelete = document.createElement("button");
            cardDelete.textContent = "削除";

            cardDelete.addEventListener("click", (event) => {
                if (event.target.matches("button")) {
                    cardList.removeChild(cardWrapper);
                    updateLocalStorage();
                }
            });

            const MemoList = document.createElement('ul');
            MemoList.id = cardText;

            const memoListString = localStorage.getItem(cardText);
            if (memoListString) {
                const memoList = JSON.parse(memoListString);
                for (const memoText of memoList) {
                    const li = document.createElement("li");
                    const div = document.createElement("div");
                    const p = document.createElement("p");
                    p.textContent = memoText;

                    const button = document.createElement("button");
                    button.textContent = "削除";

                    const btn = document.createElement("button"); // button要素取得
                    btn.textContent = "COPY!";

                    button.addEventListener("click", (event) => {
                        if (event.target.matches("button")) {
                            const deleteTarget = event.target.closest("li");
                            if (deleteTarget) {
                                document.getElementById(cardText).removeChild(deleteTarget);
                                const memo = Array.from(document.getElementById(cardText).querySelectorAll("li")).map((li) => {
                                    return li.querySelector("p").textContent;
                                });
                                localStorage.setItem(cardText, JSON.stringify(memo));
                            }
                        }
                    });

                    btn.addEventListener("click", () => { // ボタンをクリックしたら
                        navigator.clipboard
                            .writeText(memoText) // テキストをクリップボードに書き込み（＝コピー）
                            .then(
                                (success) => console.log('テキストのコピーに成功'),
                                (error) => console.log('テキストのコピーに失敗')
                            );

                        btn.innerHTML = "copied!"; // ボタンの文字変更
                        setTimeout(() => (btn.innerHTML = "COPY!"), 2000); // ボタンの文字を戻す
                    });

                    div.appendChild(p);
                    div.appendChild(button);
                    div.appendChild(btn);
                    li.appendChild(div);
                    MemoList.appendChild(li);
                }
            }

            cardHeader.appendChild(cardTitle);
            cardHeader.appendChild(cardDelete);
            card.appendChild(cardHeader);
            card.appendChild(MemoList);
            cardWrapper.appendChild(card);
            cardList.appendChild(cardWrapper);
        }
    }
});