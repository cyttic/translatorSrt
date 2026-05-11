// AppTextField.qml — compact text input.
import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import App

TextField {
    id: root
    property string value: ""
    property bool mono: false

    text: root.value
    Layout.fillWidth: true
    leftPadding: 8
    rightPadding: 8
    topPadding: 0
    bottomPadding: 0
    implicitHeight: 24
    selectByMouse: true

    font.family: mono ? Theme.fontMono : Theme.fontUi
    font.pixelSize: Theme.fontSm + 0.5
    color: Theme.text

    background: Rectangle {
        radius: Theme.radiusXs
        color: Theme.fieldBg
        border.color: root.activeFocus ? Theme.accent : Theme.fieldBorder
        border.width: 1
    }

    onTextChanged: value = text
}
