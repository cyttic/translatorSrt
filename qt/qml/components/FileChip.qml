// FileChip.qml — file display + drop target.
import QtQuick
import QtQuick.Layouts
import App

Rectangle {
    id: root
    property string fileName: ""
    property string fileMeta: ""
    signal replaceRequested()

    implicitHeight: 32
    radius: Theme.radiusS
    color: Theme.fieldBg
    border.color: Theme.fieldBorder
    border.width: 1

    RowLayout {
        anchors.fill: parent
        anchors.leftMargin: 8
        anchors.rightMargin: 8
        spacing: 8

        Rectangle {
            Layout.preferredWidth: 22
            Layout.preferredHeight: 22
            radius: Theme.radiusXs
            color: Theme.accentSoft
            StageIcon { anchors.centerIn: parent; kind: "video"; color: Theme.accent; size: 13 }
        }

        ColumnLayout {
            Layout.fillWidth: true
            spacing: 0
            Text {
                Layout.fillWidth: true
                text: root.fileName
                font.family: Theme.fontUi
                font.pixelSize: Theme.fontSm + 0.5
                font.weight: Font.DemiBold
                color: Theme.text
                elide: Text.ElideMiddle
            }
            Text {
                text: root.fileMeta
                font.family: Theme.fontMono
                font.pixelSize: Theme.fontXs
                color: Theme.textMute
            }
        }

        GhostButton {
            text: "Replace"
            onClicked: root.replaceRequested()
        }
    }

    DropArea {
        anchors.fill: parent
        onEntered: function(drag) { root.border.color = Theme.accent }
        onExited: { root.border.color = Theme.fieldBorder }
        onDropped: function(drop) {
            if (drop.hasUrls && drop.urls.length > 0) {
                root.fileName = drop.urls[0].toString().split("/").pop()
                console.log("dropped:", drop.urls[0])
            }
            root.border.color = Theme.fieldBorder
        }
    }
}
