---
layout: page
title: Arxiv alerts
description: A little Python program that allows you to follow authors on arXiv and receive desktop notifications when they submit articles
github: https://github.com/robinplantey/ArxivAlerts
lang: [Python]
img: /assets/img/arxiv-logo-1.png
importance: 2
category: fun
---

<script>
  function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
  }
</script>

## Arxiv Alerts?
Arxiv Alerts lets you keep track of any authors research. You define a list of authors that you would like to follow and the program will send you a desktop 
notification whenever they submit a new article on ArXiv. It is a small Python program that I initially wrote to be notified about my friends' new 
publications since ArXiv doesn't have a way to follow individual authors. 

## How does it work?
For each author in your subscription list, the program does a search on arxiv, parses the results and retrieves information related to any new publications, if 
there are any since the last check. If there are new articles, it prepares a summary that you can open via a desktop notification. It looks like this:

<iframe onload="resizeIframe(this);" src="demo" class="preview" id="no-theme-switch" scrolling="no" style="background-color: White;"> </iframe>

## Where can I get it?
You can find the code and documentation 
[on github](https://github.com/robinplantey/ArxivAlerts).
