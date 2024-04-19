---
layout: page
title: Strømsida
description: A locally hosted web dashboard for visualizing electricity spot price data
lang: [Python, Django]
img: /assets/img/stromsida.png
github: https://github.com/robinplantey/stromsida
banner: /assets/img/vannkraft.jpg
banner_caption: "Photo: Jon Hauge / Aftenposten"
importance: 1
category: fun
---
 

The electricity spot price fluctuates quite a lot, at least here in Norway: sometimes by more than 50% intraday. Once in a while the price can even be null or slightly negative! To take advantage of these large fluctuations I wrote [Strømsida](demo), a dashboard which integrates current hourly price data into a pretty webpage. A webpage is perfectly suited for this type of application as it is more portable and, I would argue, easier to code than a GUI. By hosting this little website on my local network everyone in my household can be smart with their electricity usage. 


# Stack

#### Backend: Python

The base layer retrieves hourly price time series from an [API](https://www.hvakosterstrommen.no/) and crunches this data into informative metrics such as averages, variations and discounts. 

#### Web framework: Django

Being a Python-person I used [Django](https://www.djangoproject.com/start/overview/) as web framework. It is well-documented and pretty intuitive which makes it easy to learn. Conceptually it consists of *views*, python functions which return data to fill html templates. A view is bound to a url and a template. Whenever a url is requested, the server calls the corresponding view and serves the corresponding template filled with the result of the view. It's also pretty easy to set up cache so that the server doesn't need to unnecessarily repeat operations. There's obviously a lot more to Django but that's really all I needed for this project. 

I definitely recommend this web framework if, like me, you want to turn your Python application into a website. 

#### Frontend

The frontend is a stripped down version of [Black Dashboard](https://github.com/creativetimofficial/black-dashboard-django/) by Creative Tim. The theme provides javascript and css code and html templates that get filled by Django's views.

#### Deployment
Finally the website is deployed to my local network using apache with mod_wsgi and a raspberry pi as a home server.

# Static demo

[Here](demo) is what the webpage currently looks like. Note that this is only a static copy, the actual page obviously shows current prices and data.

# Going further

I think a really cool follow-up project would be to write a custom API that would allow me to control connected devices e.g. a heater based on electricity prices. To be continued...
