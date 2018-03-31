$(document).ready(function () {
    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#myPage']").on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
})

dropdownSelectionArray = ["9487", "587", "801", "16", "300", "5", "2980", "878", "1", "12422", "5715", "393", "25", "140", "2199", "55", "1217", "6309", "7", "124", "4", "374", "548", "31915", "97", "7845", "30", "15280", "160", "501", "240", "1186", "11101", "20", "29", "30", "2010", "31620", "3452", "26", "805", "503", "421", "3682", "651", "0", "612", "6322", "98", "15", "191", "905", "2785", "96", "5", "4780", "5599", "4802", "603", "29", "11518", "26181", "29", "952", "375", "69688", "6439", "1016", "15", "313", "130", "130", "60", "130", "251", "247", " 11465", "33827", "26552", "1578", "16996", "17787", "4621", "2617", "25369", "610", "204", "7758", "3123", "339", "3521", "7", "539", "504", "92", "76", "13336", "13795", "51", "163", "241", "44", "30117", "389", "1", "2567", "65", "227", "2313", "23", "68", "268", "1", "35", "102", "3040", "1098", "26", "164", "160", "4560", "598", "1006", "137", "5", "7109", "18914", "2687", "276", "39", "1848", "556", "51925", "135", "16272", "146", "18", "187", "1207", "19503", "72724", "6416", "1", "344", "43299", "11809", "447", "10", "4", "1", "1018", "201", "2178", "25", "392", "3051", "6939", "1286", "4", "14836", "1964", "4596", "11", "25154", "6474", "956", "10", "86", "46414", "5855", "35641", "40", "1697", "16409", "192", "21", "134", "1063", "30946", "22", "3", "3024", "24362", "921", "40147", "188", "65655", "452", "5", "928", "8089", "0", "246", "1059", "710"];

function dropdownSelection() {
    var e = document.getElementById("mySelect");
    var x = document.getElementById("mySelect").selectedIndex;
    var y = document.getElementById("mySelect").options;
    var value = y[x].index;
    var text = y[x].text;
    if (value > 0) {
        document.getElementById("mySelectResult").innerHTML = " In last 30 years, between 1987 and 2017, <b>" + dropdownSelectionArray[value] + "</b> immigrants have moved to <b>Denmark</b> from <b>" + text + "</b>."
    } else {
        document.getElementById("mySelectResult").innerHTML = "";
    }
}

document.addEventListener('DOMContentLoaded', function () {


    // Load the data from a Google Spreadsheet
    // https://docs.google.com/spreadsheets/d/e/2PACX-1vT_NBRhbkerC_qjxZMIfCE-43BD4zJQlS3GCbQZeu6pqKqHbabpUEWHMBVK4ylNU3vEjvwXroK4Q0U8/pubhtml?gid=1597183571&single=true

    Highcharts.data({
        googleSpreadsheetKey: '1KrOd09dx20nB-rt9uXop4_1WJ7wl_F6KQBitzlvOODA',

        // Custom handler when the spreadsheet is parsed
        parsed: function (columns) {

            // Read the columns into the data array
            var data = [];
            Highcharts.each(columns[0], function (code, i) {
                data.push({
                    code: code.toUpperCase(),
                    value: parseFloat(columns[2][i]),
                    name: columns[1][i]
                });
            });

            // Initiate the chart
            Highcharts.mapChart('container-map', {
                chart: {
                    map: 'custom/world',
                    borderWidth: 1
                },

                colors: ['rgba(19,64,117,0.05)', 'rgba(19,64,117,0.2)', 'rgba(19,64,117,0.4)',
                'rgba(19,64,117,0.5)', 'rgba(19,64,117,0.6)', 'rgba(19,64,117,0.8)', 'rgba(19,64,117,1)'],

                title: {
                    text: 'Immigration from different countries'
                },

                mapNavigation: {
                    enabled: true
                },

                legend: {
                    title: {
                        text: 'Immigrants per mn',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                        }
                    },
                    align: 'left',
                    verticalAlign: 'bottom',
                    floating: true,
                    layout: 'vertical',
                    valueDecimals: 0,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255, 255, 255, 0.85)',
                    symbolRadius: 0,
                    symbolHeight: 14
                },

                colorAxis: {
                    dataClasses: [{
                        to: 100
                }, {
                        from: 100,
                        to: 400
                }, {
                        from: 400,
                        to: 700
                }, {
                        from: 700,
                        to: 1000
                }, {
                        from: 1000,
                        to: 3000
                }, {
                        from: 3000,
                        to: 6000
                }, {
                        from: 6000
                }]
                },

                series: [{
                    data: data,
                    joinBy: ['iso-a3', 'code'],
                    animation: true,
                    name: 'Immigrantion to Denmark',
                    states: {
                        hover: {
                            color: '#a4edba'
                        }
                    },
                    tooltip: {
                        valueSuffix: ' per million'
                    },
                    shadow: false
            }]
            });
        },
        error: function () {
            document.getElementById('container-map').innerHTML = '<div class="loading">' +
                '<i class="icon-frown icon-large"></i> ' +
                'Error loading data from Google Spreadsheets' +
                '</div>';
        }
    });

}, false);
