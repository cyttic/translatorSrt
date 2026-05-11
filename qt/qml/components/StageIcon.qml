// StageIcon.qml — small line-icon for a stage.
import QtQuick
import App

Item {
    id: root
    property string kind: "audio"   // "audio" | "text" | "translate" | "mux" | "video"
    property color color: Theme.text
    property real size: 14
    implicitWidth: size
    implicitHeight: size

    Canvas {
        anchors.fill: parent
        onPaint: {
            var ctx = getContext("2d");
            ctx.reset();
            ctx.strokeStyle = root.color;
            ctx.lineWidth = 1.4;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            var s = root.size / 16.0;
            ctx.scale(s, s);
            switch (root.kind) {
            case "audio":
                [[3,6,3,10],[5.5,4,5.5,12],[8,5.5,8,10.5],[10.5,3,10.5,13],[13,6,13,10]]
                  .forEach(function(p){ ctx.beginPath(); ctx.moveTo(p[0],p[1]); ctx.lineTo(p[2],p[3]); ctx.stroke(); });
                break;
            case "text":
                ctx.beginPath(); ctx.moveTo(3,4); ctx.lineTo(13,4); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(8,4); ctx.lineTo(8,13); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(5.5,13); ctx.lineTo(10.5,13); ctx.stroke();
                break;
            case "translate":
                ctx.beginPath(); ctx.moveTo(2,3); ctx.lineTo(8,3); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(5,3); ctx.lineTo(5,4.5); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(2,5); ctx.bezierCurveTo(3,7,5,8.5,6.5,9); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(3,5.5); ctx.bezierCurveTo(4,7,6,8,8,8); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(9,13); ctx.lineTo(12,6); ctx.lineTo(15,13); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(10,11); ctx.lineTo(14,11); ctx.stroke();
                break;
            case "mux":
                ctx.beginPath(); ctx.rect(1.5,2.5,9,6); ctx.stroke();
                ctx.beginPath(); ctx.rect(5.5,7.5,9,6); ctx.stroke();
                break;
            case "video":
                ctx.beginPath(); ctx.rect(1.5,3.5,10,9); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(11.5,7); ctx.lineTo(14.5,5); ctx.lineTo(14.5,11); ctx.closePath(); ctx.stroke();
                break;
            }
        }
        Connections {
            target: root
            function onKindChanged()  { parent.requestPaint(); }
            function onColorChanged() { parent.requestPaint(); }
        }
    }
}
