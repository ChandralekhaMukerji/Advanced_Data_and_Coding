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

dropdownSelectionArray = ["0", "9487", "246", "587", "801", "16", "300", "5", "2980", "878", "1", "15", "12422", "5715", "393", "25", "140", "2199", "55", "1217", "6309", "7", "124", "4", "374", "548", "22787", "97", "7845", "1", "30", "15280", "160", "501", "240", "1186", "11101", "20", "29", "30", "2010", "30729", "3452", "26", "805", "503", "3", "421", "2446", "651", "0", "612", "6322", "699", "98", "15", "191", "0", "3", "905", "2785", "96", "5", "4780", "5599", "4802", "10", "1", "603", "29", "11518", "26181", "4", "0", "0", "29", "952", "112", "375", "69576", "3299", "6439", "1016", "15", "1", "313", "130", "130", "60", "130", "251", "247", "11465", "33827", "26552", "0", "1578", "16996", "17787", "4621", "2617", "25369", "610", "204", "7758", "3123", "339", "3521", "7", "539", "504", "92", "76", "13336", "13795", "51", "163", "241", "44", "30117", "389", "1", "2567", "65", "227", "2313", "23", "68", "268", "1", "2", "35", "102", "3040", "79", "1098", "26", "164", "160", "4560", "598", "1006", "137", "5", "7109", "18914", "0", "2687", "276", "39", "1848", "11", "556", "10", "17", "51925", "11200", "135", "8", "16272", "146", "18", "187", "1207", "19503", "72724", "6416", "1", "344", "0", "43299", "10853", "447", "0", "6", "16", "5", "10", "4", "1", "1018", "201", "1610", "568", "25", "392", "0", "3051", "6240", "1286", "4", "14836", "1964", "24", "4596", "11", "0", "956", "25154", "0", "6474", "629", "956", "10", "86", "46414", "5855", "35641", "891", "40", "1697", "16409", "192", "21", "134", "0", "1063", "30946", "22", "3", "3024", "24362", "921", "40129", "188", "65655", "452", "5", "1", "928", "8089", "0", "9", "236", "9128", "1236", "1059", "710"];

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
    // https://docs.google.com/spreadsheets/d/1WBx3mRqiomXk_ks1a5sEAtJGvYukguhAkcCuRDrY1L0/pubhtml
    Highcharts.data({
        googleSpreadsheetKey: '1WBx3mRqiomXk_ks1a5sEAtJGvYukguhAkcCuRDrY1L0',

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
                        text: 'Immigrants per 1000',
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
                        to: 50
                }, {
                        from: 50,
                        to: 100
                }, {
                        from: 100,
                        to: 300
                }, {
                        from: 300,
                        to: 500
                }, {
                        from: 500,
                        to: 700
                }, {
                        from: 700,
                        to: 900
                }, {
                        from: 900
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
                        valueSuffix: '/1000'
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
