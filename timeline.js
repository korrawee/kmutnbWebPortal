const label = document.querySelector('.label');
var colors = ["#931c20","#f0c42e"];
var width = 1100,
    height = 100;

window.onload = function() {
    //Read data from JSON file
    fetch("./src/data/data.json") 
    .then(response => response.json())
    .then(d => {
        //Working with the data HERE

        var allTime = [{times: []}, {times: []}]; // date from data.json
        let arry = [[],[]];
        let catLen = data.length; // catLen = number of category
                let articleName = [];
                for(let catIndex=0 ; catIndex < catLen ; catIndex++){ // Loop each category
                    let articles = Object.values(data[catIndex])[0];
                    for(let i=0 ; i < articles.length ; i++){ // Loop each article

                        if(!articleName.includes(articles[i].topic)){ // check is this article duplicated
                            articleName.push(articles[i].topic)
                            if(articles[i].faculty === "eng"){
                                //Create array date of article 
                                let tmp = {topic: "",starting_time: 0, ending_time: 0, color:"", url:""};
                                tmp.topic = articles[i].topic;  // Don't need label, delete this 
                                tmp.url = articles[i].url;
                                tmp.starting_time = articles[i].epoch_date * 1000;
                                tmp.ending_time = articles[i].epoch_date * 1000;
                                tmp.color = colors[0];
                                arry[0].push(tmp);
                            }else{
                                //Create array date of article 
                                let tmp = {topic: "",starting_time: 0, ending_time: 0, color:"", url:""};
                                tmp.topic = articles[i].topic;  // Don't need label, delete this 
                                tmp.url = articles[i].url;
                                tmp.starting_time = articles[i].epoch_date * 1000;
                                tmp.ending_time = articles[i].epoch_date * 1000;
                                tmp.color = colors[1];

                                arry[1].push(tmp);
                            }
                        }
                    }
                }

        allTime[0].times = arry[0];
        allTime[1].times = arry[1];

        var testData = [{times: [{ "starting_time": 1600777741000, "ending_time": 1600781341000},{ "starting_time": 1599827341000, "ending_time": 1599830941000},
            {"starting_time": 1598012941000, "ending_time": 1598016541000},{"starting_time": 1597753741000, "ending_time": 1597757341000},{"starting_time": 1595593741000, "ending_time": 1595597341000}
            ,{"starting_time": 1588076941000, "ending_time": 1588076941000},{"starting_time": 1574339341000, "ending_time": 1574339341000},{"starting_time": 1551702541000, "ending_time": 1551702541000},
            {"starting_time": 1550838541000, "ending_time": 1550838541000},{"starting_time": 1536496141000, "ending_time": 1536496141000},{"starting_time": 1553171341000, "ending_time": 1553171341000}
          ,{"starting_time": 1553171341000, "ending_time": 1553171341000}]},
          {times: [
            {"starting_time": 1608121741000, "ending_time": 1608121741000},{"starting_time": 1582028941000, "ending_time": 1582028941000},{"starting_time": 1578400141000, "ending_time": 1578400141000},{"starting_time": 1608035341000, "ending_time": 1608035341000},
          {"starting_time": 1605184141000, "ending_time": 1605184141000},{"starting_time": 1586262541000, "ending_time": 1586262541000},{"starting_time": 1584275341000, "ending_time": 1584448141000},{"starting_time": 1581942541000, "ending_time": 1581942541000},]}
          ];
          console.log(testData);
        function timelineCircle() {
            var chart = d3.timeline()
            .tickFormat( //
                {format: d3.time.format("%Y:%b:%d"),
                tickTime: d3.time.months,
                tickInterval: 3,
                tickSize: 20,})
            .display("circle") // toggle between rectangles and circles

            //When over circle
            .mouseover(function (d, i, datum) { 
                console.log(d.topic);
                label.innerText = `(${i == 0 ? "eng":"sci" }) ${d.topic}`;
              })
              //When click circle
            .click(function (d, i, datum) { 
                console.log(d.url);
                window.open(d.url, "_blank");
              });
            var svg = d3.select("#timeline2").append("svg").attr("width", width).attr("height", height)
            .datum(allTime).call(chart);
        }
        function appendLegend(){
            var svg = d3.select(".legend").append("svg")
            .attr("height", 50)
            .attr("width", 600);

            //ENG legend
            svg.append('circle')
            .attr('cx', 50)
            .attr('cy', 25)
            .attr('r', 15)
            .attr('stroke', 'black')
            .attr('fill', colors[0]);
            svg.append("text").attr("fill", "black")
            .attr("x", 70).attr("y", 30).text("Engineering");

            //SCI legend
            svg.append('circle')
            .attr('cx', 200)
            .attr('cy', 25)
            .attr('r', 15)
            .attr('stroke', 'black')
            .attr('fill', colors[1]);
            svg.append("text").attr("fill", "black")
            .attr("x", 220).attr("y", 30).text("Applied Science");
        }
        timelineCircle();
        appendLegend();
    });
  }