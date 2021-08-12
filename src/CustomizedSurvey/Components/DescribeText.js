import React from "react";
import * as Survey from "survey-react";
import { ZiggeoRecorder } from "react-ziggeo";

const TYPE_NAME = "ziggeodescribetext";

export class DescribeTextModel extends Survey.Question {
    getType() {
        return TYPE_NAME;
    }
    get text() {
        return this.getPropertyValue("text", "");
    }
    set text(newValue) {
        this.setPropertyValue("text", newValue);
    }
    get message() {
        return this.getPropertyValue("message", "");
    }
    set message(newValue) {
        this.setPropertyValue("message", newValue);
    }
    get API_KEY() {
        return this.getPropertyValue("API_KEY", "");
    }
    set API_KEY(newValue) {
        this.setPropertyValue("API_KEY", newValue);
    }
    get transcription() {
        return this.getPropertyValue("transcription", "");
    }
    set transcription(newValue) {
        this.setPropertyValue("transcription", newValue);
    }
    get width() {
        return this.getPropertyValue("width", "");
    }
    set width(newValue) {
        this.setPropertyValue("width", newValue);
    }
    get height() {
        return this.getPropertyValue("height", "");
    }
    set height(newValue) {
        this.setPropertyValue("height", newValue);
    }
}

export class DescribeText extends Survey.SurveyElementBase {
    state = {
        recorder: null,
    };
    get question() {
        return this.props.question;
    }

    recorderUploaded = (ref) => {
        const {
            stream_data: { token, video_token, type },
        } = ref;
        const { transcription } = this.question;
        this.question.value = {
            token,
            video_token,
            type,
            transcription
        };
    };

    recorderVerified = (ref) => {
        const {
            stream_data: { token, video_token, type },
        } = ref;
        const { transcription } = this.question;
        this.question.value = {
            token,
            video_token,
            type,
            transcription
        };
    };

    setRecorder = (ref) => {
        this.setState({
            recorder: ref,
        });
    };

    render() {
        if (!this.question) return null;
        const { text, message, API_KEY, cssClasses, transcription, height, width } = this.question;
        return (
            <div className={cssClasses.root}>
                <div>
                    <b>{text}</b>
                </div>
                <p>{message}</p>
                <ZiggeoRecorder
                    application={API_KEY}
                    height={180}
                    width={320}
                    meta-profile='_RECORD_AUDIO_TRANSCRIPT'
                    ziggeo-meta-profile='_RECORD_AUDIO_TRANSCRIPT'
                    onRef={(ref) => this.setRecorder(ref)}
                    allowupload={false}
                    onVerified={this.recorderVerified}
                    onUploaded={this.recorderUploaded}
                    audio-transcription-as-subtitles={transcription}
                />
            </div>
        );
    }
}

Survey.Serializer.addClass(
    TYPE_NAME,
    [{ name: "text" }, { name: "message" }, { name: "API_KEY" }, { name: "transcription" }, { name: "height" }, { name: "width" }],
    function () {
        return new DescribeTextModel("");
    },
    "question"
);

Survey.ReactQuestionFactory.Instance.registerQuestion(TYPE_NAME, (props) => {
    return React.createElement(DescribeText, props);
});
