import React, { useEffect, useState } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";  // Correct import
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const NetworkGraph = () => {
    // const [data,setData]=useState(dataArr)
  useEffect(() => {
    am5.ready(function () {
      var root = am5.Root.new("chartdiv");
      root.setThemes([
        am5themes_Animated.new(root)
      ]);

      var data = {
        name: "Global Company",
        value: 0,
        children: [
            {
                name: "Branches",
                children: [
                    {
                        name: "Italy Branch",
                        value: 1000,
                        group: 2,
                        description: "Total Subscribers: 1,000,000",
                        expanded: false,
                        children: [
                            {
                                name: "Gender",
                                value: 4,
                                group: 5,
                                description: "Separates subscribers based on gender",
                                expanded: false,
                                children: [
                                    {
                                        name: "Male Subscribers",
                                        value: 500000,
                                        group: 5,
                                        description: "Count: 500,000",
                                        expanded: false,
                                    },
                                    {
                                        name: "Female Subscribers",
                                        value: 500000,
                                        group: 5,
                                        description: "Count: 500,000",
                                        expanded: false,
                                    },
                                ],
                            },
                            {
                                name: "Age Groups",
                                value: 7,
                                group: 6,
                                description: "Separates subscribers based on age",
                                expanded: false,
                                children: [
                                    {
                                        name: "Less than 20",
                                        value: 200000,
                                        group: 6,
                                        description: "Count: 200,000",
                                        expanded: false,
                                    },
                                    {
                                        name: "20-25",
                                        value: 600000,
                                        group: 6,
                                        description: "Count: 600,000",
                                        expanded: false,
                                    },
                                    {
                                        name: "25-35",
                                        value: 200000,
                                        group: 6,
                                        description: "Count: 200,000",
                                        expanded: false,
                                    },
                                ],
                            },
                            {
                                name: "Social Media Presence",
                                value: 11,
                                group: 7,
                                description: "Separates subscribers based on social media usage",
                                expanded: false,
                                children: [
                                    {
                                        name: "Instagram Users",
                                        value: 800000,
                                        group: 7,
                                        description: "Percentage: 80%",
                                        expanded: false,
                                    },
                                    {
                                        name: "Facebook Users",
                                        value: 100000,
                                        group: 7,
                                        description: "Count: 100,000",
                                        expanded: false,
                                    },
                                    {
                                        name: "Twitter Users",
                                        value: 100000,
                                        group: 7,
                                        description: "Count: 100,000",
                                        expanded: false,
                                    },
                                ],
                            },
                            {
                                name: "Follower Counts",
                                value: 15,
                                group: 8,
                                description: "Separates subscribers based on follower count",
                                expanded: false,
                                children: [
                                    {
                                        name: "Less than 5k Followers",
                                        value: 200000,
                                        group: 8,
                                        description: "Count: 200,000",
                                        expanded: false,
                                    },
                                    {
                                        name: "5k-20k Followers",
                                        value: 300000,
                                        group: 8,
                                        description: "Count: 300,000",
                                        expanded: false,
                                    },
                                    {
                                        name: "Above 20k Followers",
                                        value: 50000, // Dummy value
                                        group: 8,
                                        description: "Percentage: 5%",
                                        expanded: false,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name: "Greece Branch",
                        value: 1500000, // Dummy value
                        group: 3,
                        description: "Total Subscribers: 1,500,000", // Dummy value
                        expanded: false,
                        children: [
                            {
                                name: "Gender",
                                value: 4,
                                group: 5,
                                description: "Separates subscribers based on gender",
                                expanded: false,
                                children: [
                                    {
                                        name: "Male Subscribers",
                                        value: 500000,
                                        group: 5,
                                        description: "Count: 500,000",
                                        expanded: false,
                                    },
                                    {
                                        name: "Female Subscribers",
                                        value: 500000,
                                        group: 5,
                                        description: "Count: 500,000",
                                        expanded: false,
                                    },
                                ],
                            },
                            {
                                name: "Age Groups",
                                value: 7,
                                group: 6,
                                description: "Separates subscribers based on age",
                                expanded: false,
                                children: [
                                    {
                                        name: "Less than 20",
                                        value: 200000,
                                        group: 6,
                                        description: "Count: 200,000",
                                        expanded: false,
                                    },
                                    {
                                        name: "20-25",
                                        value: 600000,
                                        group: 6,
                                        description: "Count: 600,000",
                                        expanded: false,
                                    },
                                    {
                                        name: "25-35",
                                        value: 200000,
                                        group: 6,
                                        description: "Count: 200,000",
                                        expanded: false,
                                    },
                                ],
                            },
                            {
                                name: "Social Media Presence",
                                value: 11,
                                group: 7,
                                description: "Separates subscribers based on social media usage",
                                expanded: false,
                                children: [
                                    {
                                        name: "Instagram Users",
                                        value: 800000,
                                        group: 7,
                                        description: "Percentage: 80%",
                                        expanded: false,
                                    },
                                    {
                                        name: "Facebook Users",
                                        value: 100000,
                                        group: 7,
                                        description: "Count: 100,000",
                                        expanded: false,
                                    },
                                    {
                                        name: "Twitter Users",
                                        value: 100000,
                                        group: 7,
                                        description: "Count: 100,000",
                                        expanded: false,
                                    },
                                ],
                            },
                            {
                                name: "Follower Counts",
                                value: 15,
                                group: 8,
                                description: "Separates subscribers based on follower count",
                                expanded: false,
                                children: [
                                    {
                                        name: "Less than 5k Followers",
                                        value: 200000,
                                        group: 8,
                                        description: "Count: 200,000",
                                        expanded: false,
                                    },
                                    {
                                        name: "5k-20k Followers",
                                        value: 300000,
                                        group: 8,
                                        description: "Count: 300,000",
                                        expanded: false,
                                    },
                                    {
                                        name: "Above 20k Followers",
                                        value: 50000, // Dummy value
                                        group: 8,
                                        description: "Percentage: 5%",
                                        expanded: false,
                                    },
                                ],
                            },
                        ],

                    },
                    {
                        name: "Japan Branch",
                        value: 2000000, // Dummy value
                        group: 4,
                        description: "Total Subscribers: 2,000,000", // Dummy value
                        expanded: false,
                        children: [
                            {
                                name: "Gender",
                                value: 4,
                                group: 5,
                                description: "Separates subscribers based on gender",
                                expanded: false,
                                children: [
                                    {
                                        name: "Male Subscribers",
                                        value: 500000,
                                        group: 5,
                                        description: "Count: 500,000",
                                        expanded: false,
                                    },
                                    {
                                        name: "Female Subscribers",
                                        value: 500000,
                                        group: 5,
                                        description: "Count: 500,000",
                                        expanded: false,
                                    },
                                ],
                            },
                            {
                                name: "Age Groups",
                                value: 7,
                                group: 6,
                                description: "Separates subscribers based on age",
                                expanded: false,
                                children: [
                                    {
                                        name: "Less than 20",
                                        value: 200000,
                                        group: 6,
                                        description: "Count: 200,000",
                                        expanded: false,
                                    },
                                    {
                                        name: "20-25",
                                        value: 600000,
                                        group: 6,
                                        description: "Count: 600,000",
                                        expanded: false,
                                    },
                                    {
                                        name: "25-35",
                                        value: 200000,
                                        group: 6,
                                        description: "Count: 200,000",
                                        expanded: false,
                                    },
                                ],
                            },
                            {
                                name: "Social Media Presence",
                                value: 11,
                                group: 7,
                                description: "Separates subscribers based on social media usage",
                                expanded: false,
                                children: [
                                    {
                                        name: "Instagram Users",
                                        value: 800000,
                                        group: 7,
                                        description: "Percentage: 80%",
                                        expanded: false,
                                    },
                                    {
                                        name: "Facebook Users",
                                        value: 100000,
                                        group: 7,
                                        description: "Count: 100,000",
                                        expanded: false,
                                    },
                                    {
                                        name: "Twitter Users",
                                        value: 100000,
                                        group: 7,
                                        description: "Count: 100,000",
                                        expanded: false,
                                    },
                                ],
                            },
                            {
                                name: "Follower Counts",
                                value: 15,
                                group: 8,
                                description: "Separates subscribers based on follower count",
                                expanded: false,
                                children: [
                                    {
                                        name: "Less than 5k Followers",
                                        value: 200000,
                                        group: 8,
                                        description: "Count: 200,000",
                                        expanded: false,
                                    },
                                    {
                                        name: "5k-20k Followers",
                                        value: 300000,
                                        group: 8,
                                        description: "Count: 300,000",
                                        expanded: false,
                                    },
                                    {
                                        name: "Above 20k Followers",
                                        value: 50000, // Dummy value
                                        group: 8,
                                        description: "Percentage: 5%",
                                        expanded: false,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            }
        ]
    }


      var container = root.container.children.push(
        am5.Container.new(root, {
          width: am5.percent(100),
          height: am5.percent(100),
          layout: root.verticalLayout
        })
      );

      var series = container.children.push(
        am5hierarchy.ForceDirected.new(root, {
          singleBranchOnly: false,
          downDepth: 1,
          topDepth: 1,
          maxRadius: 25,
          minRadius: 12,
          valueField: "value",
          categoryField: "name",
          childDataField: "children",
          idField: "name",
          linkWithStrength: 0.3,
          linkWithField: "linkWith",
          manyBodyStrength: -15,
          centerStrength: 0.5
        })
      );

      series.get("colors").set("step", 2);

      series.data.setAll([data]);
      series.set("selectedDataItem", series.dataItems[0]);

      series.appear(1000, 100);
    });
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "550px"
    }}
      id="chartdiv"></div>
  );
};

export default NetworkGraph;
