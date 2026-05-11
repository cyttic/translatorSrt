// Segmented.qml — segmented control (e.g. theme toggle).
// Model: array of { label?, icon? } and currentIndex.
import QtQuick
import QtQuick.Layouts
import App

Rectangle {
    id: root
    property var items: []                 // [{ icon?: "sun"|"moon", label?: "..." }]
    property int currentIndex: 0
    signal segmentClicked(int index)

    implicitHeight: 22
    radius: Theme.radiusS
    color: Theme.chipBg

    RowLayout {
        anchors.fill: parent
        anchors.margins: 2
        spacing: 1

        Repeater {
            model: root.items
            delegate: Item {
                Layout.fillHeight: true
                Layout.preferredWidth: 26
                property bool active: index === root.currentIndex

                Rectangle {
                    anchors.fill: parent
                    radius: 4
                    color: parent.active ? Theme.panel : "transparent"
                    border.color: parent.active ? Theme.hairline : "transparent"
                    border.width: parent.active ? 1 : 0
                }

                Loader {
                    anchors.centerIn: parent
                    sourceComponent: modelData.icon === "sun"  ? sunIcon
                                   : modelData.icon === "moon" ? moonIcon
                                   : labelOnly
                    property var owner: parent
                }

                Component { id: labelOnly
                    Text {
                        text: modelData.label || ""
                        font.family: Theme.fontUi
                        font.pixelSize: Theme.fontXs
                        color: parent.owner.active ? Theme.text : Theme.textMute
                    }
                }
                Component { id: sunIcon
                    Canvas {
                        width: 13; height: 13
                        onPaint: {
                            var ctx = getContext("2d");
                            ctx.reset();
                            ctx.strokeStyle = parent.owner.active ? Theme.text : Theme.textMute;
                            ctx.lineWidth = 1.4; ctx.lineCap = "round";
                            ctx.beginPath(); ctx.arc(6.5, 6.5, 2.6, 0, Math.PI*2); ctx.stroke();
                            var rays = [[6.5,1,6.5,3],[6.5,10,6.5,12.5],[1,6.5,3,6.5],[10,6.5,12.5,6.5],
                                        [2.5,2.5,4.2,4.2],[8.8,8.8,10.5,10.5],[2.5,10.5,4.2,8.8],[8.8,4.2,10.5,2.5]];
                            for (var i=0;i<rays.length;i++){
                                ctx.beginPath();
                                ctx.moveTo(rays[i][0], rays[i][1]);
                                ctx.lineTo(rays[i][2], rays[i][3]);
                                ctx.stroke();
                            }
                        }
                    }
                }
                Component { id: moonIcon
                    Canvas {
                        width: 13; height: 13
                        onPaint: {
                            var ctx = getContext("2d");
                            ctx.reset();
                            ctx.strokeStyle = parent.owner.active ? Theme.text : Theme.textMute;
                            ctx.lineWidth = 1.4; ctx.lineCap = "round"; ctx.lineJoin = "round";
                            ctx.beginPath();
                            ctx.arc(7.5, 6.5, 4.6, Math.PI*0.15, Math.PI*1.05, false);
                            ctx.stroke();
                        }
                    }
                }

                MouseArea {
                    anchors.fill: parent
                    cursorShape: Qt.PointingHandCursor
                    onClicked: { root.currentIndex = index; root.segmentClicked(index); }
                }
            }
        }
    }
}
