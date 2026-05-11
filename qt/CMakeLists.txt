cmake_minimum_required(VERSION 3.21)
project(SubtitlesTransformer VERSION 0.1 LANGUAGES CXX)


set(CMAKE_PREFIX_PATH "$ENV{HOME}/Qt6.5/6.5.3/gcc_64")

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_AUTOMOC ON)

find_package(Qt6 6.5 REQUIRED COMPONENTS Quick QuickControls2)

qt_standard_project_setup(REQUIRES 6.5)

qt_add_executable(SubtitlesTransformer
    src/main.cpp
)

set_source_files_properties(qml/Theme.qml PROPERTIES QT_QML_SINGLETON_TYPE TRUE)

qt_add_qml_module(SubtitlesTransformer
    URI App
    VERSION 1.0
    QML_FILES
        qml/Main.qml
        qml/Theme.qml
        qml/StagesModel.qml
        qml/LogModel.qml
        qml/components/Spinner.qml
        qml/components/PrimaryButton.qml
        qml/components/GhostButton.qml
        qml/components/IconButton.qml
        qml/components/Segmented.qml
        qml/components/FileChip.qml
        qml/components/Toolbar.qml
        qml/components/PipelineChain.qml
        qml/components/StageCard.qml
        qml/components/Connector.qml
        qml/components/OverallStrip.qml
        qml/components/SettingsInspector.qml
        qml/components/SettingsSection.qml
        qml/components/Field.qml
        qml/components/AppSlider.qml
        qml/components/AppToggle.qml
        qml/components/AppSelect.qml
        qml/components/AppTextField.qml
        qml/components/Terminal.qml
        qml/components/StageIcon.qml
)

target_link_libraries(SubtitlesTransformer
    PRIVATE Qt6::Quick Qt6::QuickControls2
)

# macOS bundle metadata
set_target_properties(SubtitlesTransformer PROPERTIES
    MACOSX_BUNDLE TRUE
    MACOSX_BUNDLE_BUNDLE_NAME "SubtitlesTransformer"
    MACOSX_BUNDLE_GUI_IDENTIFIER "com.example.SubtitlesTransformer"
)

install(TARGETS SubtitlesTransformer
    BUNDLE  DESTINATION .
    RUNTIME DESTINATION bin
)
