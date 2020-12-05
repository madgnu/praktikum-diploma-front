import '../../components/headliner';
import '../../components/about';
import '../../components/input';
import '../../components/modal';
import '../../components/form';

import render from '../../modules/render';
import Root from '../../components/root';

render((new Root).render(), document.querySelector('.root'));
