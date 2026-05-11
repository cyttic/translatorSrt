// Main.qml — root window. Hosts toolbar, pipeline, overall strip, terminal,
// and the right-side settings inspector.
import QtQuick
import QtQuick.Window
import QtQuick.Controls
import QtQuick.Layouts
import App

ApplicationWindow {
    id: root
    width: 1280
    height: 820
    minimumWidth: 1024
    minimumHeight: 640
    visible: true
    title: "SubtitlesTransformer"

    // Frameless-ish look on macOS; comment this out if you prefer the
    // default OS titlebar.
    flags: Qt.Window
    color: Theme.bg

    // Shared run state
    StagesModel { id: stages }
    LogModel    { id: logModel }
    property string videoPath: "~/Movies/Lectures/lecture-04-quantum-mechanics.mp4"
    property string videoMeta: "482.6 MB · 01:24:17 · 1920×1080 · h.264"

    // Pull the font tokens onto the window so children can rely on them.
    font.family: Theme.fontUi
    font.pixelSize: Theme.fontBase

    // ── BODY ────────────────────────────────────────────────────
    RowLayout {
        anchors.fill: parent
        spacing: 0

        // Main column
        ColumnLayout {
            Layout.fillWidth: true
            Layout.fillHeight: true
            spacing: 0

            Toolbar {
                Layout.fillWidth: true
                fileName: root.videoPath.split("/").pop()
                fileMeta: root.videoMeta
                onThemeToggleRequested: Theme.dark = !Theme.dark
                onStopRequested: console.log("stop")
                onReplaceRequested: console.log("replace")
            }

            Item {
                Layout.fillWidth: true
                Layout.preferredHeight: 22
            }

            PipelineChain {
                Layout.fillWidth: true
                Layout.leftMargin: 22
                Layout.rightMargin: 22
                model: stages
            }

            OverallStrip {
                Layout.fillWidth: true
                Layout.topMargin: 14
                Layout.leftMargin: 22
                Layout.rightMargin: 22
                progress: stages.overall()
                elapsed: "00:03:42"
                eta: "00:05:18"
            }

            Item {
                Layout.fillWidth: true
                Layout.preferredHeight: 14
            }

            Terminal {
                Layout.fillWidth: true
                Layout.fillHeight: true
                model: logModel
            }
        }

        // Right inspector
        SettingsInspector {
            Layout.preferredWidth: 320
            Layout.fillHeight: true
        }
    }

}
