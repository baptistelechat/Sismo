<h1 align="center">Sismo 🏡</h1>

<img src="./frontend/public/logo.png" height="150" align="right">

A tool to get the snow, wind, and seismicity zones in France (including DROM-COM).

![Code Time](https://img.shields.io/endpoint?style=flat&url=https://codetime-api.datreks.com/badge/353?logoColor=white%26project=Sismo%26recentMS=0%26showProject=false)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/baptistelechat/Sismo/blob/main/LICENSE.txt)
[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://sismo.vercel.app)

## 💻 Visit Website
Go to https://sismo-api.vercel.app to use the project.

## ✨ Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### 🚩 Prerequisites
You have to install node on your machine : https://nodejs.org/en/download/

### ✔ Installing
A step by step that tell you how to get a development env running.

Step 1: clone the project by using the commands below :
```bash
git clone https://github.com/baptistelechat/Sismo.git
```
Step 2: go to "api" folder :
```bash
cd api
```
Step 3: install the packages:
```bash
npm install
```
Step 4: start your local server:
```bash
npm start
```
Step 5 : open a browser and go to localhost
```bash
localhost:8000
```

## 📚 API Reference

### Get items by Code Postal

```http
  GET /api/v1/city/cp/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Id is "Code Postal" of item(s) to fetch |

### Get items by Code INSEE

```http
  GET /api/v1/city/insee/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Id is "Code INSEE" of item(s) to fetch |

### Get items by name

```http
  GET /api/v1/city/name/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Id is name of item(s) to fetch |

## 🏗 Built With
- Express → https://expressjs.com/fr/

<p align="left">
<img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" height="65">
</p>

## 😸 Maintainers
This project is mantained by:
* [Baptiste et Matthieu LECHAT - baptistelechat](https://github.com/baptistelechat)

## 👨‍💻👩‍💻 Contributing

1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -m 'Add some feature')
4. Push your branch (git push origin my-new-feature)
5. Create a new Pull Request

## ⭐ Show your support
Give a ⭐️ for support the project or if this project helped you !

## 📝 License
Copyright © 2021 [Baptiste LECHAT and Matthieu LECHAT](https://github.com/baptistelechat).<br />
This project is [MIT](https://github.com/baptistelechat/Sismo/blob/main/LICENSE.txt) licensed.

## 😂 Gitmoji

This project use Gitmoji : "An emoji guide for your commit messages".

<p align="left">
	<a href="https://gitmoji.carloscuesta.me">
		<img src="https://cloud.githubusercontent.com/assets/7629661/20073135/4e3db2c2-a52b-11e6-85e1-661a8212045a.gif" width="250" alt="gitmoji">
	</a>
</p>
<p align="left">
	<a href="https://travis-ci.org/carloscuesta/gitmoji">
		<img src="https://img.shields.io/travis/carloscuesta/gitmoji/master?style=flat-square"
			 alt="Build Status">
	</a>
	<a href="https://gitmoji.carloscuesta.me">
		<img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square"
			 alt="Gitmoji">
	</a>
</p>