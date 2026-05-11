// GhostButton.qml — subtle outlined button.
import QtQuick
import QtQuick.Controls
import App

Button {
    id: root
    height: 22
    padding: 0
    leftPadding: 8
    rightPadding: 8

    contentItem: Text {
        text: root.text
        font.family: Theme.fontUi
        font.pixelSize: Theme.fontXs + 0.5
        font.weight: Font.Medium
        color: Theme.textMute
        horizontalAlignment: Text.AlignHCenter
        verticalAlignment: Text.AlignVCenter
    }

    background: Rectangle {
        radius: Theme.radiusXs
        color: root.down ? Theme.chipBg : "transparent"
        border.color: Theme.fieldBorder
        border.width: 1
    }
}
