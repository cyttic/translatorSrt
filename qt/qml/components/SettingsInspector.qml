// SettingsInspector.qml — right-side stack of collapsible settings sections.
import QtQuick
import QtQuick.Layouts
import QtQuick.Controls
import App

Rectangle {
    id: root
    color: Theme.panelMute

    Rectangle {
        anchors.left: parent.left
        anchors.top: parent.top
        anchors.bottom: parent.bottom
        width: 1
        color: Theme.hairline
    }

    ColumnLayout {
        anchors.fill: parent
        spacing: 0

        // Header
        Rectangle {
            Layout.fillWidth: true
            Layout.preferredHeight: 38
            color: "transparent"
            Rectangle {
                anchors.left: parent.left; anchors.right: parent.right
                anchors.bottom: parent.bottom; height: 1; color: Theme.hairline
            }
            RowLayout {
                anchors.fill: parent
                anchors.leftMargin: 14
                anchors.rightMargin: 14
                spacing: 8
                Text {
                    text: "Pipeline Settings"
                    font.family: Theme.fontUi
                    font.pixelSize: Theme.fontBase
                    font.weight: Font.DemiBold
                    color: Theme.text
                }
                Item { Layout.fillWidth: true }
                Rectangle {
                    Layout.preferredHeight: 18
                    Layout.preferredWidth: presetText.width + 12
                    radius: 4
                    color: Theme.chipBg
                    Text {
                        id: presetText
                        anchors.centerIn: parent
                        text: "preset: default"
                        font.family: Theme.fontMono
                        font.pixelSize: Theme.fontXs
                        color: Theme.textMute
                    }
                }
            }
        }

        // Scrollable section stack
        Flickable {
            Layout.fillWidth: true
            Layout.fillHeight: true
            contentWidth: width
            contentHeight: sections.height
            clip: true
            ScrollBar.vertical: ScrollBar { policy: ScrollBar.AsNeeded }

            ColumnLayout {
                id: sections
                width: parent.width
                spacing: 0

                SettingsSection {
                    Layout.fillWidth: true
                    label: "Output"
                    badge: "mp4"
                    open: true

                    Field { label: "Destination"; AppTextField { value: "~/Movies/SubsOut/"; mono: true } }
                    Field { label: "Filename pattern"; AppTextField { value: "{name}.{lang}.{ext}"; mono: true } }
                    AppToggle { label: "Overwrite existing"; on: false }
                    AppToggle { label: "Open in Finder when done"; on: true }
                }

                SettingsSection {
                    Layout.fillWidth: true
                    label: "1 · Extract Audio"
                    badge: "ffmpeg"
                    open: true

                    Field { label: "Codec"; AppSelect { value: "pcm_s16le · 16-bit" } }
                    Field { label: "Sample rate"; AppSlider { value: 0.5; valueLabel: "16k" } }
                    AppToggle { label: "Mono downmix"; on: true }
                    AppToggle { label: "Loudness normalize"; on: false }
                }

                SettingsSection {
                    Layout.fillWidth: true
                    label: "2 · Transcribe"
                    badge: "whisper"
                    open: true

                    Field { label: "Model"; AppSelect { value: "large-v3 (ggml, 1.55 GB)" } }
                    Field { label: "Source language"; AppSelect { value: "Auto-detect" } }
                    Field { label: "Beam size"; AppSlider { value: 0.5; valueLabel: "5" } }
                    AppToggle { label: "VAD (silero)"; on: true }
                    AppToggle { label: "Word timestamps"; on: true }
                    AppToggle { label: "Use Metal (GPU)"; on: true }
                }

                SettingsSection {
                    Layout.fillWidth: true
                    label: "3 · Translate (AI)"
                    open: false

                    Field { label: "Provider"; AppSelect { value: "OpenAI" } }
                    Field { label: "Target language"; AppSelect { value: "Русский (ru-RU)" } }
                }

                SettingsSection {
                    Layout.fillWidth: true
                    label: "4 · Mux Subtitles"
                    open: false

                    Field { label: "Mode"; AppSelect { value: "Softsub (mov_text)" } }
                }
            }
        }
    }
}
