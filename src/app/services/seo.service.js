export default {
    name: 'SeoService',
    function: ["ngMeta", "$location", '$rootScope', 'constants', SeoService]
}

function SeoService(ngMeta, $location, $rootScope, constants) {

    var generateTags = (config) => {

        var appSettings = $rootScope.getCurrentEnvironment();

        var config_ = {
            title: 'Colibri Móveis',
            description: 'Somos umas das principais industriais do setor moveleiro na produção de móveis, reconhecidos por ser uma empresa inovadora no segmento através do nosso design.',
            image: appSettings.SITE_URL+'/assets/img/share-default.jpg',
            slug: appSettings.SITE_URL,
            canonical: appSettings.SITE_URL
        };

        if (config && config.titleConcat){
            config.title = config.title+" - "+config_.title;
       
        }else if(config && config.title){
            config.title = config.title+" - "+"Colibri Móveis";
        }

        config = Object.assign({},config_,config || {});
        config.canonical = config.canonical || config.slug;

        $('title').text(config.title);
        // ngMeta.setTitle(config.title);

        ngMeta.setTag('type', 'website');
        ngMeta.setTag('image',  config.image);
        ngMeta.setTag('description', config.description);
        
        ngMeta.setTag('og:type', 'website');
        ngMeta.setTag('og:site_name', 'colibrimoveis');
        ngMeta.setTag('og:title', config.title);
        ngMeta.setTag('og:description', config.description);
        ngMeta.setTag('og:image',  config.image);
        ngMeta.setTag('og:image:width', 555);
        ngMeta.setTag('og:image:height', 330);
        ngMeta.setTag('og:url', config.slug);
        ngMeta.setTag('canonical', config.canonical);

        if(config.next){
            $('head').append($('<link rel="next" href="'+(config.next)+'"/>'))
        }else{
            $('link[rel="next"]').remove()
        }

        if(config.prev){
            $('head').append($('<link rel="prev" href="'+(config.prev)+'"/>'))
        }else{
            $('link[rel="prev"]').remove()
        }
        
        if(config.amphtml){
            $('head').append($('<link rel="amphtml" href="'+(config.amphtml)+'"/>'))
        }else{
            $('link[rel="amphtml"]').remove()
        }
        
        ngMeta.setTag('fb:app_id', "");

        // Google PageView
        if (typeof(gtag)=="function"){
            
            // Analitcs
            gtag('config', "UA-167434239-1", {
                'page_title' : config.title,
                'page_location': $location.absUrl(),
                'page_path': $location.path()
            });

        }
       
    }
    
    var ldJsonHome = () => {

        var appSettings = $rootScope.getCurrentEnvironment();
        
        createldJson({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": 'Colibri Móveis',
            "description": 'Somos umas das principais industriais do setor moveleiro na produção de móveis, reconhecidos por ser uma empresa inovadora no segmento através do nosso design.',
            "address": {
                "@type": "PostalAddress",
                "addressCountry": {
                    "@type": "Country",
                    "name": "BR"
                },
                "addressLocality": "Arapongas",
                "addressRegion": "PR",
                "postalCode": "86706-418",
                "streetAddress": "Tatuapé, Arapongas - PR"
            },
            "logo": appSettings.SITE_URL+"/assets/img/logo-bird.png",
            "brand": {
                "@type": "Brand",
                "logo": appSettings.SITE_URL+"/assets/img/logo-bird.png"
            },
            "telephone": "+55 43 3275-8600",
            "URL": appSettings.SITE_URL+"/"
        });
    }

    var createldJson = (jsonLd) => {
        $('#jsonLd').remove();
        var scriptTag = $("<script>");
        scriptTag.attr("type", "application/ld+json");
        scriptTag.attr("id", "jsonLd");
        scriptTag.append(JSON.stringify(jsonLd));
        $('head').append(scriptTag);
    }

    this.generateTags = generateTags;
    this.ldJsonHome = ldJsonHome;
    this.createldJson = createldJson;

}
