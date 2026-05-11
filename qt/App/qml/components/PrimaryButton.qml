// PrimaryButton.qml — solid accent button.
import QtQuick
import QtQuick.Controls
import App

Button {
    id: root
    property color accent: Theme.accent
    height: 26
    padding: 0
    leftPadding: 12
    rightPadding: 12

    contentItem: Text {
        text: root.text
        font.family: Theme.fontUi
        font.pixelSize: Theme.fontSm + 0.5
        font.weight: Font.DemiBold
        color: "#ffffff"
        horizontalAlignment: Text.AlignHCenter
        verticalAlignment: Text.AlignVCenter
    }

    background: Rectangle {
        radius: Theme.radiusS
        color: root.down ? Qt.darker(root.accent, 1.15)
              : root.hovered ? Qt.lighter(root.accent, 1.08)
              : root.accent
        border.color: Qt.darker(root.accent, 1.2)
        border.width: 0
        // bottom hairline shadow
        Rectangle {
            anchors.left: parent.left
            anchors.right: parent.right
            anchors.bottom: parent.bottom
            height: 1
            color: Qt.rgba(0,0,0,0.12)
            radius: 1
        }
    }
}
