// Connector.qml — chevron arrow between stage cards.
import QtQuick
import App

Canvas {
    id: root
    property bool filled: false
    onFilledChanged: requestPaint()

    onPaint: {
        var ctx = getContext("2d"); ctx.reset();
        var color = root.filled ? Theme.success : Theme.textFaint;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2; ctx.lineCap = "round"; ctx.lineJoin = "round";
        if (!root.filled) ctx.setLineDash([2, 2]);
        // Horizontal line
        ctx.beginPath(); ctx.moveTo(1, height/2); ctx.lineTo(width - 1, height/2); ctx.stroke();
        // Arrow head
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(width - 5, height/2 - 4);
        ctx.lineTo(width - 1, height/2);
        ctx.lineTo(width - 5, height/2 + 4);
        ctx.stroke();
    }
}
