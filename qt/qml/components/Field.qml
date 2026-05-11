// Field.qml — label + child control(s).
import QtQuick
import QtQuick.Layouts
import App

ColumnLayout {
    id: root
    default property alias content: holder.data
    property string label: ""
    property string hint: ""

    Layout.fillWidth: true
    spacing: 3

    Text {
        text: root.label
        font.family: Theme.fontUi
        font.pixelSize: Theme.fontXs + 0.5
        font.weight: Font.Medium
        color: Theme.textMute
    }

    ColumnLayout {
        id: holder
        Layout.fillWidth: true
        spacing: 4
    }

    Text {
        visible: root.hint.length > 0
        text: root.hint
        font.family: Theme.fontUi
        font.pixelSize: Theme.fontXs
        color: Theme.textFaint
    }
}
