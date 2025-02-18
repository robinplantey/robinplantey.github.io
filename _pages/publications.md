---
layout: page
permalink: /publications/
title: Publications
description: #publications by categories in reversed chronological order. generated by jekyll-scholar.
years: [2024,2022]
nav: true
---

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>

## PhD thesis
* [Analysis techniques for symmetries of multi-Higgs-doublet potentials (2024)](/assets/pdf/thesis-digital.pdf)

## Degree projects

* [Entanglement Entropies in 1+1d critical systems (research internship, 2020)](/assets/pdf/internship-report-2020.pdf)
* [RGE analysis of the Froggatt-Nielsen mechanism in 2HDMs (master thesis, 2019)](http://lup.lub.lu.se/student-papers/record/8986051/file/8986075.pdf)
