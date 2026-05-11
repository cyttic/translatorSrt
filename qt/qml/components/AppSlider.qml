// AppSlider.qml — compact slider with value label.
import QtQuick
import QtQuick.Layouts
import App

RowLayout {
    id: root
    property real value: 0
    property string valueLabel: ""
    Layout.fillWidth: true
    spacing: 8

    Item {
        Layout.fillWidth: true
        Layout.preferredHeight: 14

        Rectangle {
            id: track
            anchors.verticalCenter: parent.verticalCenter
            anchors.left: parent.left
            anchors.right: parent.right
            height: 3
            radius: 2
            color: Theme.chipBg

            Rectangle {
                anchors.left: parent.left
                anchors.top: parent.top
                anchors.bottom: parent.bottom
                width: parent.width * Math.max(0, Math.min(1, root.value))
                radius: 2
                color: Theme.accent
            }
        }

        Rectangle {
            width: 12; height: 12; radius: 6
            color: "white"
            border.color: Qt.rgba(0,0,0,0.18)
            border.width: 1
            anchors.verticalCenter: parent.verticalCenter
            x: track.width * Math.max(0, Math.min(1, root.value)) - width / 2
        }

        MouseArea {
            anchors.fill: parent
            cursorShape: Qt.PointingHandCursor
            onPressed: function(m) { root.value = Math.max(0, Math.min(1, m.x / width)) }
            onPositionChanged: function(m) {
                if (pressed) root.value = Math.max(0, Math.min(1, m.x / width))
            }
        }
    }

    Text {
        text: root.valueLabel
        Layout.minimumWidth: 28
        horizontalAlignment: Text.AlignRight
        font.family: Theme.fontMono
        font.pixelSize: Theme.fontXs + 0.5
        color: Theme.textMute
    }
}
