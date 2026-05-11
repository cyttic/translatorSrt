// Toolbar.qml — top toolbar: file chip, theme toggle, stop button.
import QtQuick
import QtQuick.Layouts
import App

Rectangle {
    id: root
    property string fileName: ""
    property string fileMeta: ""
    signal themeToggleRequested()
    signal stopRequested()
    signal replaceRequested()

    implicitHeight: Theme.toolbarH
    color: Theme.panelMute

    Rectangle {
        anchors.left: parent.left
        anchors.right: parent.right
        anchors.bottom: parent.bottom
        height: 1
        color: Theme.hairline
    }

    RowLayout {
        anchors.fill: parent
        anchors.leftMargin: 16
        anchors.rightMargin: 16
        anchors.topMargin: 9
        anchors.bottomMargin: 9
        spacing: 10

        FileChip {
            Layout.fillWidth: false
            Layout.preferredWidth: 480
            fileName: root.fileName
            fileMeta: root.fileMeta
            onReplaceRequested: root.replaceRequested()
        }

        Item { Layout.fillWidth: true }

        Segmented {
            items: [ { icon: "sun" }, { icon: "moon" } ]
            currentIndex: Theme.dark ? 1 : 0
            onSegmentClicked: function(i) {
                Theme.dark = (i === 1)
                root.themeToggleRequested()
            }
        }

        PrimaryButton {
            text: "Stop"
            accent: Theme.error
            onClicked: root.stopRequested()
        }
    }
}
