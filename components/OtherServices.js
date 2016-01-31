import React from 'react';

const services = [
    {
        title: 'Blogg',
        img: '//files.holderdeord.no/images/stortingssalen.jpg',
        url: 'https://blog.holderdeord.no/',
        description: 'Datadrevne analyser av norsk politikk'
    },

    {
        title: 'Sagt i salen',
        img: '//files.holderdeord.no/images/tale.png',
        url: 'https://tale.holderdeord.no/',
        description: 'Visualisering av språkbruk på Stortinget'
    },

    {
        title: 'Partipisken',
        img: '//files.holderdeord.no/images/partipisken.jpg',
        url: 'https://twitter.com/partipisken',
        description: 'Rebeller på tinget'
    },

    {
        title: 'holderdeord.no',
        url: 'https://www.holderdeord.no/',
        description: 'Løfter, avstemninger, forslag og saker',
        style: {
            backgroundImage: `url(//files.holderdeord.no/images/blog-header.jpg)`,
            backgroundPosition: '50% 4%'
        }
    }
]

export default (props) => {
    return (
        <div className="other-services hdo-card">
            <div className="hdo-card-header text-xs-center">
                <h3>Andre tjenester fra Holder de ord</h3>
            </div>

            <div className="row no-gutters text-xs-center">
                {services.map(service => (
                    <div className="col-md-6 service" key={service.title}>
                        <a href={service.url}>
                            <div className="img" style={service.style || {backgroundImage: `url(${service.img})`}} />

                            <div className="p-a-2">
                                <h4>{service.title}</h4>

                                <p className="lead">{service.description}</p>
                            </div>
                        </a>
                    </div>                    
                ))}
            </div>            
        </div>
    );
}