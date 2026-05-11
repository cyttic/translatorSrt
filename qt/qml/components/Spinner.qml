// Spinner.qml — small spinning ring drawn via Canvas (no shape deps).
import QtQuick
import App

Item {
    id: root
    property color color: Theme.accent
    property real size: 12

    implicitWidth: size
    implicitHeight: size

    Canvas {
        id: c
        anchors.fill: parent
        rotation: 0

        onPaint: {
            var ctx = getContext("2d");
            ctx.reset();
            var cx = width / 2, cy = height / 2;
            var r  = Math.min(width, height) / 2 - 1;
            var lw = Math.max(1, root.size / 7);
            // Ghost ring
            ctx.beginPath();
            ctx.lineWidth = lw;
            ctx.strokeStyle = Qt.rgba(root.color.r, root.color.g, root.color.b, 0.25);
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.stroke();
            // Active arc (~270°)
            ctx.beginPath();
            ctx.lineCap = "round";
            ctx.strokeStyle = root.color;
            ctx.arc(cx, cy, r, -Math.PI / 2, Math.PI);
            ctx.stroke();
        }

        Connections {
            target: root
            function onColorChanged() { c.requestPaint(); }
            function onSizeChanged()  { c.requestPaint(); }
        }

        RotationAnimation on rotation {
            from: 0; to: 360; duration: 900
            loops: Animation.Infinite; running: true
        }
    }
}
