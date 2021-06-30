import React, { useState, useEffect } from "react";
import * as Survey from "survey-react";
import * as widgets from "surveyjs-widgets";
import "survey-react/survey.css";
import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

import "pretty-checkbox/dist/pretty-checkbox.css";

import { json } from "./inputJSON.js";

window["$"] = window["jQuery"] = $;

export { DescribeImage } from "./CustomComponents/DescribeImage";
export { TextWithButton } from "./CustomComponents/TextWithButton";

Survey.StylesManager.applyTheme("default");

//widgets.icheck(Survey, $);
widgets.prettycheckbox(Survey);
widgets.select2(Survey, $);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey, $);
widgets.jqueryuidatepicker(Survey, $);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey, $);
//widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey, $);
widgets.bootstrapslider(Survey);

function onValueChanged() {}

export function SurveyPage() {
  const model = new Survey.Model(json);
  const [startDate] = useState(new Date());
  const [ip, setIP] = useState(null);

  const onComplete = (result) => {
    fetch("/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: result.data,
        ip,
        timestamp: {
          startDate,
          endDate: new Date(),
        },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setIP(res.ip);
      })
      .catch((err) => console.log(err));
    console.log({
      data: result.data,
      ip,
      timestamp: {
        startDate,
        endDate: new Date(),
      },
    });
  };

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setIP(res.ip);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h2>USING: SurveyJS Library - a sample survey below</h2>
      <Survey.Survey
        model={model}
        onComplete={onComplete}
        onValueChanged={onValueChanged}
      />
    </div>
  );
}
