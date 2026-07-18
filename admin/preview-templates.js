/* Vista previa en vivo del panel de administración.
   Usa los mismos estilos reales de la web (styles.css) para que lo que
   se ve aquí sea prácticamente idéntico a lo publicado. */

var FUENTES_TITULOS_PREVIEW = {
  fraunces: "'Fraunces', serif",
  playfair: "'Playfair Display', serif",
  merriweather: "'Merriweather', serif",
  baskerville: "'Libre Baskerville', serif",
  bitter: "'Bitter', serif"
};
var FUENTES_TEXTO_PREVIEW = {
  worksans: "'Work Sans', sans-serif",
  inter: "'Inter', sans-serif",
  lato: "'Lato', sans-serif",
  nunito: "'Nunito Sans', sans-serif",
  sourcesans: "'Source Sans 3', sans-serif"
};
var ALTURAS_IMAGEN_PREVIEW = { compacta: '220px', normal: '340px', grande: '460px' };
var PADDINGS_HERO_PREVIEW = { compacta: '50px 20px 40px', normal: '70px 20px 60px', grande: '100px 20px 90px' };
var AVATAR_PREVIEW = { pequeno: '48px', normal: '62px', grande: '84px' };

// Carga la hoja de estilos real de la web dentro del iframe de vista previa.
CMS.registerPreviewStyle('/styles.css');

/* ---------- Vista previa: Portada (hero) y estilo general ---------- */
var AjustesPreview = createClass({
  render: function () {
    var data = this.props.entry.get('data');
    var getAsset = this.props.getAsset;
    var val = function (key, fallback) {
      var v = data.get(key);
      return v === undefined || v === null || v === '' ? fallback : v;
    };
    var heroImg = data.get('heroImagen');
    var heroUrl = heroImg ? getAsset(heroImg) : null;

    var wrapperStyle = {
      '--granite': val('colorFondo', '#18160f'),
      '--limestone': val('colorTexto', '#f3ecdb'),
      '--wheat': val('colorPrincipal', '#d6a53f'),
      '--clay': val('colorSecundario', '#b8451f'),
      '--rosemary': val('colorTerciario', '#4f7a63'),
      '--dusk': val('colorCuaternario', '#4a6f8c'),
      '--display': FUENTES_TITULOS_PREVIEW[val('fuenteTitulos', 'fraunces')],
      '--body': FUENTES_TEXTO_PREVIEW[val('fuenteTexto', 'worksans')],
      background: 'var(--granite)',
      padding: '0 0 24px 0',
      fontFamily: 'var(--body)'
    };

    var heroStyle = {
      backgroundImage: heroUrl
        ? 'linear-gradient(155deg, rgba(18,16,11,0.94) 20%, rgba(184,69,31,0.24) 100%), url(' + heroUrl + ')'
        : 'linear-gradient(155deg, rgba(18,16,11,0.94) 20%, rgba(184,69,31,0.24) 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center ' + val('heroImagenPosicionY', 20) + '%',
      padding: PADDINGS_HERO_PREVIEW[val('heroAltura', 'normal')]
    };

    return h('div', { style: wrapperStyle },
      h('div', { className: 'hero', style: heroStyle },
        h('div', { className: 'hero-inner' },
          h('div', { className: 'hero-text' },
            h('span', { className: 'hero-eyebrow' }, val('eyebrow', '')),
            h('h1', {}, val('titulo', '')),
            h('p', {}, val('subtitulo', ''))
          )
        )
      ),
      h('div', { style: { display: 'flex', gap: '10px', padding: '20px 20px 0 20px', flexWrap: 'wrap' } },
        h('div', { style: { background: 'var(--wheat)', width: '52px', height: '52px', borderRadius: '6px' }, title: 'Color principal' }),
        h('div', { style: { background: 'var(--clay)', width: '52px', height: '52px', borderRadius: '6px' }, title: 'Color secundario' }),
        h('div', { style: { background: 'var(--rosemary)', width: '52px', height: '52px', borderRadius: '6px' }, title: 'Color terciario' }),
        h('div', { style: { background: 'var(--dusk)', width: '52px', height: '52px', borderRadius: '6px' }, title: 'Color cuaternario' })
      ),
      h('p', { style: { color: 'var(--limestone)', opacity: 0.6, fontSize: '0.75rem', padding: '10px 20px 0 20px' } },
        'Vista previa aproximada. El tamaño de letra y los avatares de la junta se ven en su tamaño real en la web publicada.'
      )
    );
  }
});
CMS.registerPreviewTemplate('ajustes', AjustesPreview);

/* ---------- Vista previa: Aviso destacado de Inicio ---------- */
var InicioPreview = createClass({
  render: function () {
    var data = this.props.entry.get('data');
    var getAsset = this.props.getAsset;
    var img = data.get('imagen');
    var url = img ? getAsset(img) : '';
    var altura = ALTURAS_IMAGEN_PREVIEW[data.get('imagenAltura')] || ALTURAS_IMAGEN_PREVIEW.normal;

    return h('div', { className: 'container', style: { background: 'var(--granite)', padding: '20px' } },
      h('div', { className: 'custom-card', style: { maxWidth: '450px' } },
        h('div', { className: 'card-img-wrap' },
          h('img', { className: 'card-img', src: url, style: { height: altura } })
        ),
        h('div', { className: 'card-body' },
          h('span', { className: 'card-tag ' + (data.get('tagColor') || 'gold') }, data.get('tag')),
          h('h3', { className: 'card-title' }, data.get('titulo')),
          h('p', { className: 'card-meta', dangerouslySetInnerHTML: { __html: data.get('descripcion') || '' } })
        )
      )
    );
  }
});
CMS.registerPreviewTemplate('inicio', InicioPreview);

/* ---------- Vista previa: Eventos ---------- */
var EventosPreview = createClass({
  render: function () {
    var data = this.props.entry.get('data');
    var getAsset = this.props.getAsset;
    var eventos = data.get('eventos') || [];

    return h('div', { className: 'container', style: { background: 'var(--granite)', padding: '20px' } },
      h('div', { className: 'grid-cards' },
        eventos.map(function (ev, i) {
          var img = ev.get('imagen');
          var url = img ? getAsset(img) : '';
          var altura = ALTURAS_IMAGEN_PREVIEW[ev.get('imagenAltura')] || ALTURAS_IMAGEN_PREVIEW.normal;
          return h('div', { className: 'custom-card', key: i },
            h('div', { className: 'card-img-wrap' },
              h('img', { className: 'card-img', src: url, style: { height: altura } })
            ),
            h('div', { className: 'card-body' },
              h('span', { className: 'card-tag ' + (ev.get('tagColor') || 'gold') }, ev.get('tag')),
              h('h3', { className: 'card-title' }, ev.get('titulo')),
              h('p', { className: 'card-meta', dangerouslySetInnerHTML: { __html: ev.get('descripcion') || '' } })
            )
          );
        }).toArray()
      )
    );
  }
});
CMS.registerPreviewTemplate('eventos', EventosPreview);

/* ---------- Vista previa: Junta Directiva ---------- */
var JuntaPreview = createClass({
  render: function () {
    var data = this.props.entry.get('data');
    var getAsset = this.props.getAsset;
    var miembros = data.get('miembros') || [];

    return h('div', { className: 'container', style: { background: 'var(--granite)', padding: '20px' } },
      h('div', { className: 'grid-junta' },
        miembros.map(function (m, i) {
          var foto = m.get('foto');
          var fotoUrl = foto ? getAsset(foto) : null;
          return h('div', { className: 'junta-member', key: i },
            h('div', { className: 'member-avatar' },
              fotoUrl
                ? h('img', { src: fotoUrl, style: { width: '100%', height: '100%', objectFit: 'cover' } })
                : (m.get('avatar') || '🤝')
            ),
            h('h3', {}, m.get('nombre')),
            h('p', {}, m.get('cargo'))
          );
        }).toArray()
      )
    );
  }
});
CMS.registerPreviewTemplate('junta', JuntaPreview);

/* ---------- Vista previa: Nuestra Historia ---------- */
var HistoriaPreview = createClass({
  render: function () {
    var data = this.props.entry.get('data');
    var getAsset = this.props.getAsset;
    var parrafos = data.get('parrafos') || [];
    var timeline = data.get('timeline') || [];
    var img = data.get('imagen');
    var url = img ? getAsset(img) : null;

    return h('div', { className: 'container', style: { background: 'var(--granite)', padding: '20px' } },
      h('div', { className: 'historia-layout' },
        h('div', { className: 'historia-text' },
          url ? h('img', { src: url, style: { width: '100%', borderRadius: '6px', marginBottom: '16px' } }) : null,
          parrafos.map(function (p, i) {
            return h('p', { key: i }, p.get('texto'));
          }).toArray()
        ),
        h('div', { className: 'timeline' },
          timeline.map(function (t, i) {
            return h('div', { className: 'timeline-item', key: i },
              h('div', { className: 'timeline-year' }, t.get('anio')),
              h('p', {}, t.get('texto'))
            );
          }).toArray()
        )
      )
    );
  }
});
CMS.registerPreviewTemplate('historia', HistoriaPreview);
