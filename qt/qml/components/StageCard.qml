// StageCard.qml — one stage in the horizontal pipeline.
import QtQuick
import QtQuick.Layouts
import App

Rectangle {
    id: card
    property int stageIndex: 0
    property string stageName: ""
    property string stageSub: ""
    property string iconKind: "audio"
    property string status: "idle"            // idle|active|done|error
    property real   progress: 0.0
    property string elapsedText: ""

    readonly property bool isActive: status === "active"
    readonly property bool isDone:   status === "done"
    readonly property color accent: isActive ? Theme.accent
                                  : isDone   ? Theme.success
                                  :            Theme.textFaint
    readonly property color iconBg: isActive ? Theme.accentSoft
                                  : isDone   ? Theme.successSoft
                                  :            Theme.chipBg

    implicitHeight: 116
    radius: Theme.radius
    color: Theme.panel
    border.color: isActive ? Theme.accent : Theme.hairline
    border.width: 1

    // Subtle outer glow when active
    Rectangle {
        anchors.fill: parent
        anchors.margins: -3
        radius: parent.radius + 3
        color: "transparent"
        border.color: Theme.accentSoft
        border.width: card.isActive ? 3 : 0
        z: -1
    }

    ColumnLayout {
        anchors.fill: parent
        anchors.margins: 12
        spacing: 6

        RowLayout {
            Layout.fillWidth: true
            spacing: 8

            Rectangle {
                Layout.preferredWidth: 26
                Layout.preferredHeight: 26
                radius: Theme.radiusS
                color: card.iconBg
                StageIcon {
                    anchors.centerIn: parent
                    kind: card.iconKind
                    color: card.accent
                    size: 14
                }
            }

            ColumnLayout {
                Layout.fillWidth: true
                spacing: 1
                Text {
                    text: card.stageName
                    font.family: Theme.fontUi
                    font.pixelSize: Theme.fontSm + 0.5
                    font.weight: Font.DemiBold
                    color: Theme.text
                }
                Text {
                    text: card.stageSub
                    font.family: Theme.fontMono
                    font.pixelSize: Theme.fontXs
                    color: Theme.textMute
                }
            }

            Loader {
                Layout.preferredWidth: 14
                Layout.preferredHeight: 14
                sourceComponent: card.isActive ? spinnerCmp
                              : card.isDone   ? checkCmp
                              : null
            }
        }

        // Progress bar
        Rectangle {
            Layout.fillWidth: true
            Layout.topMargin: 4
            height: 4
            radius: 2
            color: Theme.chipBg
            clip: true
            Rectangle {
                anchors.left: parent.left
                anchors.top: parent.top
                anchors.bottom: parent.bottom
                width: parent.width * Math.max(0, Math.min(1, card.progress))
                radius: 2
                color: card.isDone ? Theme.success : Theme.accent
            }
        }

        // Status line
        RowLayout {
            Layout.fillWidth: true
            spacing: 6
            Text {
                text: card.isDone   ? "DONE"
                    : card.isActive ? "RUNNING · " + Math.round(card.progress*100) + "%"
                    :                 "QUEUED"
                font.family: Theme.fontMono
                font.pixelSize: Theme.fontXs + 0.5
                font.weight: Font.DemiBold
                color: card.accent
            }
            Item { Layout.fillWidth: true }
            Text {
                text: card.elapsedText
                font.family: Theme.fontMono
                font.pixelSize: Theme.fontXs
                color: Theme.textFaint
            }
        }
    }

    Component { id: spinnerCmp; Spinner { color: card.accent; size: 12 } }
    Component { id: checkCmp
        Canvas {
            width: 14; height: 14
            onPaint: {
                var ctx = getContext("2d"); ctx.reset();
                ctx.strokeStyle = Theme.success;
                ctx.lineWidth = 2; ctx.lineCap = "round"; ctx.lineJoin = "round";
                ctx.beginPath();
                ctx.moveTo(3, 7.5); ctx.lineTo(6, 10.5); ctx.lineTo(11.5, 4.5);
                ctx.stroke();
            }
        }
    }
}
