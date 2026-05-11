// AppToggle.qml — label + iOS-style switch on the right.
import QtQuick
import QtQuick.Layouts
import App

RowLayout {
    id: root
    property string label: ""
    property bool on: false

    Layout.fillWidth: true
    spacing: 8

    Text {
        Layout.fillWidth: true
        text: root.label
        font.family: Theme.fontUi
        font.pixelSize: Theme.fontSm + 0.5
        color: Theme.text
    }

    Rectangle {
        Layout.preferredWidth: 28
        Layout.preferredHeight: 16
        radius: 8
        color: root.on ? Theme.accent : Theme.chipBg
        border.color: root.on ? "transparent" : Theme.fieldBorder
        border.width: 1
        Behavior on color { ColorAnimation { duration: 120 } }

        Rectangle {
            width: 12
            height: 12
            radius: 6
            color: "white"
            border.color: Qt.rgba(0,0,0,0.10)
            border.width: 1
            anchors.verticalCenter: parent.verticalCenter
            x: root.on ? parent.width - width - 2 : 2
            Behavior on x { NumberAnimation { duration: 120 } }
        }

        MouseArea {
            anchors.fill: parent
            cursorShape: Qt.PointingHandCursor
            onClicked: root.on = !root.on
        }
    }
}
