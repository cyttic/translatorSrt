// PipelineChain.qml — horizontal row of stage cards with connectors.
import QtQuick
import QtQuick.Layouts
import App

Item {
    id: root
    property var model: null

    implicitHeight: 124

    Row {
        anchors.fill: parent
        spacing: 8

        Repeater {
            model: root.model
            delegate: Item {
                width: (root.width - (root.model.count - 1) * 8) / root.model.count
                height: root.height

                StageCard {
                    anchors.fill: parent
                    anchors.rightMargin: index < root.model.count - 1 ? 8 : 0
                    stageIndex: index
                    stageName: name
                    stageSub: sub
                    iconKind: icon
                    status: model.status
                    progress: model.progress
                    elapsedText: elapsedText
                }

                Connector {
                    visible: index < root.model.count - 1
                    width: 16
                    height: 12
                    x: parent.width - 12
                    y: 22
                    filled: model.status === "done"
                }
            }
        }
    }
}
