var $ = require('jquery');
var _ = require('lodash');
var _str = require('underscore.string');
var cheerio = require('cheerio');
var request = require('request');

//var GoogleSpreadsheet = require("google-spreadsheet");
var GoogleSpreadsheet = require("/Users/admin/Projects/Scraper/node_modules/google-spreadsheet/index.js");
var my_sheet = new GoogleSpreadsheet('1S0CXDafIqgTghq7rR9c41oPZuNm-_dMxWGII6671Diw');

var locations = [
	'Austin TX'
];

// var categories = {
// 	restaurants: {
// 		subcategories: [
// 			'afghan',
// 			'african',
// 			'asianfusion',
// 			'newamerican',
// 			'tradeamerican'
// 		]
// 	}
// };

var url = 'http://yelp.com/search?cflt=restaurants&find_loc=Austin, TX&start=0';
request(url, function(error, response, body) {
	if(error) console.error('Category was not found');
	else
		$ = cheerio.load(body);
		$items = $('ul.search-results.ylist li');
		for(i in $items) {
			var $item = $items[i];
			biz = {};
			biz.name = _str.trim($('.biz-name', $item).text());

			if(_.isEmpty(biz.name)) return;

			biz.profileImage = _str.trim($('.photo-box-img', $item).attr('src'));
			biz.address = _str.trim($('address', $item).html().replace('<br>', ', '));
			biz.phone = _str.trim($('.biz-phone', $item).text());
			biz.categories = _str.trim($('.category-str-list', $item).text());
			biz.categories = _.map(biz.categories.split(','), function(str) { return _str.trim(str) });
			console.log(biz);

			console.log(biz.name)

			//Edit the Google Spreadsheet
				// set auth to be able to edit/add/delete

			//https://docs.google.com/spreadsheets/d/1S0CXDafIqgTghq7rR9c41oPZuNm-_dMxWGII6671Diw/edit#gid=0
				my_sheet.setAuth('esaias.tong@gmail.com','r1280138', function(err){
				if (err) console.log(err);
    			// you can also add and read rows by just indicating the worksheet id (starts at 1)
				my_sheet.addRow( 1, { 
				name: "IDK",//+,str.trim($('.biz-name', 1).text()),
				profileImage: ""+_str.trim($('.photo-box-img', i).attr('src')),
				address: ""+_str.trim($('address', 0).html().replace('<br>', ', ')),
				phone: ""+_str.trim($('.biz-phone', i).text()),
				categories: "IDFK"//+str.trim($('.category-str-list', 0).text()) 
					})

				})
		}
});

/*
for(i in categories) {
	var category = categories[i];
	for(j in category.subcategories) {
		var subcategory = category.subcategories[j];
		var url = 'http://yelp.com/search?cflt='+subcategory+'&find_loc=Austin, TX';

		request(url, function(error, response, body) {
			if(error) console.error('Category was not found');
			else
				$ = cheerio.load(body);
				$item = $('ul.search-results.ylist li');
				console.log($('.biz-name', $item).text());
		});
	}
}
*/
