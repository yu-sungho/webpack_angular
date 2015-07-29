module.exports = {
    context : __dirname + '/src',
    entry : './app.js',

    module : {
        loaders : [
            {test : /\.js$/, exclude:'/node_modules', loader : 'babel'},
            {test : /\.less$/, exclude:'/node_modules', loader : 'style!css!less'},
            {test : /\.json$/, exclude:'/node_modules', loader : 'json'}
        ]
    },

    devServer: {
 	  headers: { "Access-Control-Allow-Origin": "*" }
	}
};