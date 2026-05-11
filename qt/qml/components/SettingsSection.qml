// SettingsSection.qml — disclosure / collapsible section.
import QtQuick
import QtQuick.Layouts
import App

Item {
    id: root
    default property alias content: contentColumn.data
    property string label: ""
    property string badge: ""
    property bool open: true

    implicitWidth: parent ? parent.width : 240
    implicitHeight: header.height + (open ? contentColumn.height + 12 : 0) + 1

    Rectangle {
        anchors.bottom: parent.bottom
        anchors.left: parent.left
        anchors.right: parent.right
        height: 1
        color: Theme.hairlineFaint
    }

    Rectangle {
        id: header
        anchors.left: parent.left
        anchors.right: parent.right
        anchors.top: parent.top
        height: 30
        color: "transparent"

        RowLayout {
            anchors.fill: parent
            anchors.leftMargin: 14
            anchors.rightMargin: 14
            spacing: 6

            Canvas {
                Layout.preferredWidth: 9
                Layout.preferredHeight: 9
                rotation: root.open ? 90 : 0
                Behavior on rotation { NumberAnimation { duration: 120 } }
                onPaint: {
                    var ctx = getContext("2d"); ctx.reset();
                    ctx.strokeStyle = Theme.textFaint;
                    ctx.lineWidth = 1.5; ctx.lineCap = "round"; ctx.lineJoin = "round";
                    ctx.beginPath(); ctx.moveTo(3,2); ctx.lineTo(6,5); ctx.lineTo(3,8); ctx.stroke();
                }
            }

            Text {
                text: root.label.toUpperCase()
                Layout.fillWidth: true
                font.family: Theme.fontUi
                font.pixelSize: Theme.fontXs + 0.5
                font.weight: Font.Bold
                font.letterSpacing: 0.4
                color: Theme.textMute
            }

            Rectangle {
                visible: root.badge.length > 0
                Layout.preferredHeight: 16
                Layout.preferredWidth: badgeText.width + 12
                radius: 4
                color: Theme.chipBg
                Text {
                    id: badgeText
                    anchors.centerIn: parent
                    text: root.badge
                    font.family: Theme.fontMono
                    font.pixelSize: Theme.fontXs
                    color: Theme.textMute
                }
            }
        }

        MouseArea {
            anchors.fill: parent
            cursorShape: Qt.PointingHandCursor
            onClicked: root.open = !root.open
        }
    }

    ColumnLayout {
        id: contentColumn
        visible: root.open
        anchors.top: header.bottom
        anchors.left: parent.left
        anchors.right: parent.right
        anchors.leftMargin: 14
        anchors.rightMargin: 14
        anchors.topMargin: 2
        spacing: 6
    }
}
