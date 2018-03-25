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

dropdownSelectionArray = ["array-1", "array-2", "array-3", "array-4"];

function dropdownSelection() {
    var e = document.getElementById("mySelect");
    var x = document.getElementById("mySelect").selectedIndex;
    var y = document.getElementById("mySelect").options;
    var value = y[x].index;
    var text = y[x].text;
    console.log("Value : " + value);
    console.log("Text :" + text);
    if (value > 0) {
        document.getElementById("mySelectResult").innerHTML = " Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoomnifoodncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus."
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
                    text: 'Immigration from different countries (per 1000)'
                },

                mapNavigation: {
                    enabled: true
                },

                legend: {
                    title: {
                        text: 'Population per 1000',
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
