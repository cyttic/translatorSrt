// IconButton.qml — square button with arbitrary children.
import QtQuick
import QtQuick.Controls
import App

AbstractButton {
    id: root
    property alias glyph: holder.data
    implicitWidth: 28
    implicitHeight: 24

    background: Rectangle {
        radius: Theme.radiusXs
        color: root.down ? Theme.chipBg : root.hovered ? Theme.hairlineFaint : "transparent"
    }

    contentItem: Item {
        id: holder
        anchors.fill: parent
    }
}
