// AppSelect.qml — read-only select-looking field (drop in a Menu later).
import QtQuick
import QtQuick.Layouts
import App

Rectangle {
    id: root
    property string value: ""

    Layout.fillWidth: true
    implicitHeight: 24
    radius: Theme.radiusXs
    color: Theme.fieldBg
    border.color: Theme.fieldBorder
    border.width: 1

    RowLayout {
        anchors.fill: parent
        anchors.leftMargin: 8
        anchors.rightMargin: 6
        spacing: 6

        Text {
            text: root.value
            Layout.fillWidth: true
            font.family: Theme.fontUi
            font.pixelSize: Theme.fontSm + 0.5
            color: Theme.text
            elide: Text.ElideRight
        }

        Canvas {
            Layout.preferredWidth: 8
            Layout.preferredHeight: 11
            onPaint: {
                var ctx = getContext("2d"); ctx.reset();
                ctx.strokeStyle = Theme.textMute;
                ctx.lineWidth = 1.2; ctx.lineCap = "round"; ctx.lineJoin = "round";
                ctx.beginPath(); ctx.moveTo(1.5, 3.5); ctx.lineTo(4, 1); ctx.lineTo(6.5, 3.5); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(1.5, 7.5); ctx.lineTo(4, 10); ctx.lineTo(6.5, 7.5); ctx.stroke();
            }
        }
    }

    MouseArea { anchors.fill: parent; cursorShape: Qt.PointingHandCursor }
}
