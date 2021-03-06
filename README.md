# Проект: Mesto Russia
---

![HTML](https://img.shields.io/badge/-HTML-05122A?style=flat&logo=HTML5)&nbsp;
![CSS](https://img.shields.io/badge/-CSS-05122A?style=flat&logo=CSS3&logoColor=1572B6)&nbsp;
![JavaScript](https://img.shields.io/badge/-JavaScript-05122A?style=flat&logo=javascript)&nbsp;
![JSON](https://img.shields.io/badge/-JSON-05122A?style=flat&logo=JSON)&nbsp;
![BEM](https://img.shields.io/badge/-BEM-05122A?style=flat&logo=BEM)&nbsp;
![OOP](https://img.shields.io/badge/-ООП-05122A?style=flat&logo=StackShare&logoColor=green)&nbsp;
![Git](https://img.shields.io/badge/-Git-05122A?style=flat&logo=git)&nbsp;
![GitHub](https://img.shields.io/badge/-GitHub-05122A?style=flat&logo=github)&nbsp;
![Webpack](https://img.shields.io/badge/-Webpack-05122A?style=flat&logo=Webpack)&nbsp;

### О проекте
Проект предназначен для отработки навыков программирования на языке JavaScript.
Проект демонстрирует функционал социальной платформы, отображающей имеющиеся на сервере фотографии и позволяющей пользователям загружать свои фотографии, ставить лайки на любые фото, удалять свои карточки. Кроме того, пользователь может редактировать свои данные, менять аватар.

#### Функционал и техническое исполнение проекта
- реализован класс Api.js с FETCH-запросами (GET, POST, DELETE, PATCH, PUT): загрузка стартовых карточек с сервера, добавление новых фото, простановка like, удаление карточки с фото, замена данных подьователя и аватара;
- реализованы модальные окна с формой ввода данных пользователем. Для работы попапов создан класс Popup.js, который имеет дочерние классы PopupWithForm.js (окно ввода/редактирования данныз), PopupWithSubmit.js (окно запроса подтверждения), PopupWithImage.js (окно с увеличенным изображением практически на весь экран). При создании дочерних классов используется наследование и полиморфизм;
- для всех полей ввода всех попапов с формами ввода/редактирования данных организована валидация вводимых данных посредством JS, за валидацию отвечает класс FormValidator.js:
<img src="./readmefiles/validation.gif" alt="валидация форм" width="600">
- нажатие на кнопку "Редактировать" в профиле пользователя выводит popup-окно с имеющимися на странице данными, которые можно отредактировать и сохранить. При сохранении новы данных отправляется запрос на сервер и по факту получения ответа об успешной замене, происходит о бновление данных на страниц. При закрытии окна без сохранения данные перезаписаны не будут:
<img src="./readmefiles/profile.gif" alt="редактирование профиля" width="600">
- нажатие на кнопку "+" выводит окно с формой ввода названия и ссылки на новое фото:
<img src="./readmefiles/foto1.gif" alt="добавление/удаление/лайк/попап" width="600">
- нажатие на любое фото открывает окно просмотра фотографии в увеличенном масштабе;
- любой попап можно закрыть тремя способами (нажатием на "крестик" закрытия в правом верхнем углу попапа, нажатием на любую часть поля вокруг попапа, нажатием кнопки Esc);
- реализовано плавное открытие/закрытие попапов;
- улучшен плозовательский интерфейс в части информирования о текущем статусе процесса (в момент отработки запроса к серверу происходит замена надписи на кнопке с начального на "Сохранение". По факту получения  успешного ответа от сервера надпись меняется на изначальное значение);
- для построения сетки выводимых карточек с фото применена flexbox- и grid-вёрстка;
- адаптивная верстка под разные разрешения пользовательских устройств;



### 🛠 Инструкция по развёртыванию:

В проекте настроен сборщик Webpack, для сборки рабочей версии проекта необходимо:
- клонировать репозиторий:</br>
`$ git clone <адрес репозитория>`
- установить npm:</br>
`$ npm install`
- если потребуются обновления для пакетов:</br>
`$ npm update`
- собрать проект:</br>
`$ npm run build`
- готовый проект будет находиться в папке /dist, для запуска необходимо открыть в браузере файл index.html.


#### В сборке используются следущие плагины:
◻️ Babel-core</br>
◻️ Babel-loader</br>
◻️ Babel-preset</br>
◻️ Autoprefixer</br>
◻️ Clean plugin</br>
◻️ Css-loader</br>
◻️ Cssnano</br>
◻️ Gh-pages</br>
◻️ HTML Webpack Plugin</br>
◻️ Mini-css-extract-plugin</br>
◻️ Postcss-loader</br>
◻️ Webpack</br>
◻️ Webpack</br>
◻️ Webpack-dev-server</br>
◻️ Core-js</br>


[**Демо страницы на GitHub Pages**](https://alexander-nov.github.io/mesto/)

