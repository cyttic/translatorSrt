#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQuickStyle>

int main(int argc, char *argv[])
{
    QGuiApplication app(argc, argv);
    app.setOrganizationName("Example");
    app.setApplicationName("SubtitlesTransformer");

    // "Basic" gives us neutral controls we can fully restyle.
    // Use "macOS" if you want native controls instead — but then a lot of the
    // custom styling in this project will be overridden.
    QQuickStyle::setStyle("Basic");

    QQmlApplicationEngine engine;
    engine.loadFromModule("App", "Main");

    if (engine.rootObjects().isEmpty())
        return -1;

    return app.exec();
}
