// LogModel.qml — terminal-style scrollback for stage output and errors.
// kind: "info" | "ok" | "warn" | "error" | "log"
import QtQuick

ListModel {
    id: logModel

    ListElement { ts: "[12:04:18]"; kind: "info"; stage: "extract"; text: "ffmpeg started · -i lecture-04...mp4 -vn -ac 1 -ar 16000" }
    ListElement { ts: "[12:04:32]"; kind: "ok";   stage: "extract"; text: "wrote /tmp/sxt-9af2/audio.wav (133.4 MB) in 14.2s" }
    ListElement { ts: "[12:04:32]"; kind: "info"; stage: "whisper"; text: "loading model large-v3 (1.55 GB) on Metal" }
    ListElement { ts: "[12:04:34]"; kind: "info"; stage: "whisper"; text: "language detected: en (prob 0.998)" }
    ListElement { ts: "[12:05:11]"; kind: "log";  stage: "whisper"; text: "segment 412/1280 · \"the wave function collapses when...\"" }
    ListElement { ts: "[12:05:48]"; kind: "log";  stage: "whisper"; text: "segment 818/1280 · \"in the Copenhagen interpretation we say...\"" }
    ListElement { ts: "[12:06:02]"; kind: "warn"; stage: "whisper"; text: "low-confidence span 00:38:21 → 00:38:24 (0.42)" }
    ListElement { ts: "[12:06:26]"; kind: "log";  stage: "whisper"; text: "segment 1180/1280 · running · 64%" }

    function append(kind, stage, text) {
        var d = new Date()
        var pad = function (n) { return n < 10 ? "0" + n : "" + n }
        var ts = "[" + pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds()) + "]"
        logModel.append({ ts: ts, kind: kind, stage: stage, text: text })
    }
}
