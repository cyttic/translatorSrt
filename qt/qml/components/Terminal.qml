// Terminal.qml — bottom log panel; mono font, colored prefixes.
import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import App

Rectangle {
    id: root
    property var model: null

    color: Theme.terminal

    Rectangle {
        anchors.left: parent.left
        anchors.right: parent.right
        anchors.top: parent.top
        height: 1
        color: Theme.hairline
    }

    ColumnLayout {
        anchors.fill: parent
        spacing: 0

        // Header
        Rectangle {
            Layout.fillWidth: true
            Layout.preferredHeight: 26
            color: "transparent"

            Rectangle {
                anchors.left: parent.left; anchors.right: parent.right
                anchors.bottom: parent.bottom
                height: 1
                color: Qt.rgba(1,1,1,0.06)
            }

            RowLayout {
                anchors.fill: parent
                anchors.leftMargin: 12
                anchors.rightMargin: 12
                spacing: 10

                Text {
                    text: "OUTPUT"
                    font.family: Theme.fontUi
                    font.pixelSize: Theme.fontXs + 0.5
                    font.weight: Font.DemiBold
                    color: Qt.rgba(1,1,1,0.6)
                }

                RowLayout {
                    spacing: 6
                    Repeater {
                        model: ["All", "Errors", "Stage"]
                        delegate: Rectangle {
                            Layout.preferredHeight: 16
                            Layout.preferredWidth: tabText.width + 14
                            radius: 4
                            color: index === 0 ? Qt.rgba(1,1,1,0.10) : "transparent"
                            Text {
                                id: tabText
                                anchors.centerIn: parent
                                text: modelData
                                font.family: Theme.fontUi
                                font.pixelSize: Theme.fontXs
                                color: index === 0 ? "white" : Qt.rgba(1,1,1,0.55)
                            }
                        }
                    }
                }

                Item { Layout.fillWidth: true }

                Text {
                    text: "tail · auto-scroll"
                    font.family: Theme.fontMono
                    font.pixelSize: Theme.fontXs
                    color: Qt.rgba(1,1,1,0.4)
                }
                Text {
                    text: "clear"
                    font.family: Theme.fontMono
                    font.pixelSize: Theme.fontXs
                    color: Qt.rgba(1,1,1,0.4)
                }
            }
        }

        // Body
        ListView {
            id: lv
            Layout.fillWidth: true
            Layout.fillHeight: true
            clip: true
            model: root.model
            interactive: true
            spacing: 0
            leftMargin: 12
            rightMargin: 12
            topMargin: 8
            bottomMargin: 8
            onCountChanged: positionViewAtEnd()
            ScrollBar.vertical: ScrollBar { policy: ScrollBar.AsNeeded }

            delegate: RowLayout {
                width: ListView.view.width - 24
                spacing: 10

                Text {
                    text: ts
                    font.family: Theme.fontMono
                    font.pixelSize: Theme.fontSm
                    color: Qt.rgba(1,1,1,0.35)
                }
                Text {
                    text: "[" + stage + "]"
                    Layout.minimumWidth: 76
                    font.family: Theme.fontMono
                    font.pixelSize: Theme.fontSm
                    font.weight: Font.DemiBold
                    color: kind === "info" ? Theme.accent
                         : kind === "ok"   ? Theme.success
                         : kind === "warn" ? Theme.warn
                         : kind === "error"? Theme.error
                         :                   Theme.textMute
                }
                Text {
                    Layout.fillWidth: true
                    text: model.text
                    font.family: Theme.fontMono
                    font.pixelSize: Theme.fontSm
                    color: Theme.terminalText
                    wrapMode: Text.WordWrap
                }
            }

            footer: RowLayout {
                width: lv.width - 24
                spacing: 10
                Text {
                    text: "[12:06:32]"
                    font.family: Theme.fontMono
                    font.pixelSize: Theme.fontSm
                    color: Qt.rgba(1,1,1,0.35)
                }
                Text {
                    text: "[whisper]"
                    Layout.minimumWidth: 76
                    font.family: Theme.fontMono
                    font.pixelSize: Theme.fontSm
                    font.weight: Font.DemiBold
                    color: Theme.accent
                }
                Text {
                    text: "▍ transcribing…"
                    font.family: Theme.fontMono
                    font.pixelSize: Theme.fontSm
                    color: Qt.rgba(1,1,1,0.6)
                    Timer {
                        interval: 500; running: true; repeat: true
                        onTriggered: parent.opacity = parent.opacity > 0.5 ? 0.4 : 1.0
                    }
                }
            }
        }
    }
}
