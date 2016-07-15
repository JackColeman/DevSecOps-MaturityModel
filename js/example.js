function loadDiagramm() {
    d3.select('#energychart').selectAll("*").remove();
    $.getJSON("spiderwebData.php", function (data) {
        var labels = [], values = [];
        $.each(data, function (leveli, subdimension) {
            $.each(subdimension, function (dimensionName, level) {
                $.each(level, function (subdimensionName, data) {
                    labels.push(subdimensionName);
                    if (data['selected'] == 0) {
                        values.push(0);
                    } else {
                        values.push(100 / data['count'] * data['selected']);
                    }
                });
            });
        });

        var chart = circularHeatChart()
            .segmentHeight(60)
            .innerRadius(40)
            .numSegments(12)
            .radialLabels(["Ebene 1", "Ebene 2", "Ebene 3", "Ebene 4"])
            .segmentLabels(labels)
            .range(["white", "green"])

        d3.select('#energychart')
            .selectAll('svg')
            .data([values])
            .enter()
            .append('svg')
            .call(chart);
    });
    $('html,body').scrollTop(0);
}