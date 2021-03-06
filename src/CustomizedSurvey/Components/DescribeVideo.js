import React from "react";
import * as Survey from "survey-react";
import { ZiggeoRecorder } from "react-ziggeo";

const TYPE_NAME = "ziggeodescribevideo";

export class DescribeVideoModel extends Survey.Question {
    getType() {
        return TYPE_NAME;
    }
    get text() {
        return this.getPropertyValue("text", "");
    }
    set text(newValue) {
        this.setPropertyValue("text", newValue);
    }
    get url() {
        return this.getPropertyValue("url", "");
    }
    set url(newValue) {
        this.setPropertyValue("url", newValue);
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

export class DescribeVideo extends Survey.SurveyElementBase {
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
        const { text, url, API_KEY, cssClasses, transcription, height, width } = this.question;
        return (
            <div className={cssClasses.root}>
                <div>
                    <b>{text}</b>
                </div>
                <video width={width} height={height} controls>
                    <source src={url} />
                    Your browser does not support HTML video.
                </video>
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
    [{ name: "text" }, { name: "url" }, { name: "API_KEY" }, { name: "transcription" }, { name: "height" }, { name: "width" }],
    function () {
        return new DescribeVideoModel("");
    },
    "question"
);

Survey.ReactQuestionFactory.Instance.registerQuestion(TYPE_NAME, (props) => {
    return React.createElement(DescribeVideo, props);
});
