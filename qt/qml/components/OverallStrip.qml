// OverallStrip.qml — overall progress + elapsed + eta.
import QtQuick
import QtQuick.Layouts
import App

Rectangle {
    id: root
    property real progress: 0
    property string elapsed: ""
    property string eta: ""

    implicitHeight: 36
    radius: Theme.radius
    color: Theme.panel
    border.color: Theme.hairline
    border.width: 1

    RowLayout {
        anchors.fill: parent
        anchors.leftMargin: 14
        anchors.rightMargin: 14
        spacing: 14

        Text {
            text: "OVERALL"
            font.family: Theme.fontUi
            font.pixelSize: Theme.fontXs + 0.5
            font.weight: Font.DemiBold
            color: Theme.textMute
        }

        Rectangle {
            Layout.fillWidth: true
            Layout.preferredHeight: 6
            radius: 3
            color: Theme.chipBg
            clip: true
            Rectangle {
                anchors.left: parent.left
                anchors.top: parent.top
                anchors.bottom: parent.bottom
                width: parent.width * Math.max(0, Math.min(1, root.progress))
                radius: 3
                color: Theme.accent
            }
        }

        Text {
            text: "• " + Math.round(root.progress * 100) + "%"
            font.family: Theme.fontMono
            font.pixelSize: Theme.fontSm
            color: Theme.text
        }
        Text {
            text: "elapsed " + root.elapsed
            font.family: Theme.fontMono
            font.pixelSize: Theme.fontSm
            color: Theme.text
        }
        Text {
            text: "eta " + root.eta
            font.family: Theme.fontMono
            font.pixelSize: Theme.fontSm
            color: Theme.text
        }
    }
}
