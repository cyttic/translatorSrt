// Theme.qml — singleton with light/dark macOS-flavored tokens.
// Toggle by setting Theme.dark = true/false from anywhere.
pragma Singleton
import QtQuick

QtObject {
    id: theme

    property bool dark: true

    // Font stacks
    readonly property string fontUi:   "-apple-system, SF Pro Display, SF Pro Text, Inter, system-ui, sans-serif"
    readonly property string fontMono: "JetBrains Mono, SF Mono, Menlo, monospace"

    // Sizes (compact pro-tool density)
    readonly property int titlebarH: 38
    readonly property int toolbarH:  44
    readonly property int radius:    8
    readonly property int radiusS:   6
    readonly property int radiusXs:  5
    readonly property int fontXs:    10
    readonly property int fontSm:    11
    readonly property int fontBase:  12
    readonly property int fontMd:    13
    readonly property int fontLg:    15
    readonly property int fontXl:    22

    // Surfaces
    readonly property color bg:           dark ? "#1c1c1e"            : "#ececef"
    readonly property color panel:        dark ? "#252527"            : "#ffffff"
    readonly property color panelMute:    dark ? "#1f1f21"            : "#f5f5f7"
    readonly property color sidebar:      dark ? Qt.rgba(0.149,0.149,0.165,0.92)
                                              : Qt.rgba(0.965,0.965,0.969,0.92)
    readonly property color titlebar:     dark ? Qt.rgba(0.157,0.157,0.173,0.92)
                                              : Qt.rgba(0.925,0.925,0.937,0.92)
    readonly property color terminal:     dark ? "#0e0e10"            : "#1c1c1e"
    readonly property color terminalText: dark ? "#d4d4d6"            : "#e8e8ea"

    // Text
    readonly property color text:      dark ? "#f5f5f7"                : "#1d1d1f"
    readonly property color textMute:  dark ? Qt.rgba(1,1,1,0.55)      : Qt.rgba(0,0,0,0.6)
    readonly property color textFaint: dark ? Qt.rgba(1,1,1,0.30)      : Qt.rgba(0,0,0,0.35)

    // Lines
    readonly property color hairline:      dark ? Qt.rgba(1,1,1,0.08)  : Qt.rgba(0,0,0,0.10)
    readonly property color hairlineFaint: dark ? Qt.rgba(1,1,1,0.05)  : Qt.rgba(0,0,0,0.06)

    // Fields & chips
    readonly property color fieldBg:     dark ? "#2c2c2e"              : "#ffffff"
    readonly property color fieldBorder: dark ? Qt.rgba(1,1,1,0.10)    : Qt.rgba(0,0,0,0.12)
    readonly property color chipBg:      dark ? Qt.rgba(1,1,1,0.06)    : Qt.rgba(0,0,0,0.05)

    // Accents & state
    readonly property color accent:     dark ? "#0a84ff" : "#0066cc"
    readonly property color accentSoft: dark ? Qt.rgba(0.04,0.52,1.0,0.18)
                                            : Qt.rgba(0,0.4,0.8,0.12)
    readonly property color success:     dark ? "#30d158" : "#28a745"
    readonly property color successSoft: dark ? Qt.rgba(0.19,0.82,0.34,0.16)
                                             : Qt.rgba(0.16,0.65,0.27,0.12)
    readonly property color warn:        dark ? "#ffd60a" : "#f0a020"
    readonly property color error:       dark ? "#ff453a" : "#d73a49"
}
