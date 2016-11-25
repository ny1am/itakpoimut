import React from 'react';

import Layout from '../layouts/Main';

import Comments from '../components/Comments';
import NewCompanies from '../components/NewCompanies';
import AutocompleteSearch from '../components/AutocompleteSearch';

class LandingPage extends React.Component {
	render() {
		//get rid of page_url somehow
		return (
			<Layout page_url={this.props.page_url} loggedUser={this.props.loggedUser}>
				<section className="landing">
					<div className="container">
						<h1 className="main-header">
							База компаній громадської ініціативи <q>И так поймут</q>
						</h1>
						<p className="info">
							Тут ви можете перевірити, чи компанія використовує виключно українську мову, обслуговуючи своїх клієнтів в Україні.
						</p>
						<div id="todo-remove-autocomplete">
							<AutocompleteSearch />
						</div>
					</div>
				</section>
				<div className="pattern bottom-space">
					<div className="container">
						<section className="description">
							<h1 className="description-title">
								<q className="standalone-quote">И так поймут</q> Каталог <abbr title="Засоби масової інформації">ЗМІ</abbr> та бізнесу
							</h1>
							<p className="description-text">
								Це сервіс, де можна перевірити, чи компанія обслуговує своїх клієнтів українською мовою: чи має україномовний сайт, інструкції, етикетки, різні супровідні документи та навіть сторінки у соцмережах. 
							</p>
						</section>
						<section className="search-by-name">
							<h1 className="description-title">
								Шукайте компанії за назвою
							</h1>
							<p className="description-text">
								Якщо ви знаєте назву компанії і хочете перевірити її лояльність, скористайтесь пошуком за назвою компанії. Для цього введіть у поле пошуку кілька перших букв назви й оберіть потрібну компанію із запропонованих нашим розумним пошуком варіантів.
							</p>
							<a className="page__button" href="/companies">
								Шукати за назвою
							</a>
						</section>
						<section className="search-by-category">
							<h1 className="description-title">
								Шукайте компанії за сферою діяльності
							</h1>
							<p className="description-text">
								Хочете скористатись послугами певної компанії, та не знаєте, яка з плеяди представлених на ринку лояльна до україномовного споживача? Скористайтесь нашим пошуком по сферах. Оберіть сферу послуг, що вас цікавить, серед списку зліва на сторінці <q>Всі компанії</q> або у стрічці пошуку на головній сторінці.
							</p>
							<a className="page__button" href="/companies">
								Шукати за сферою
							</a>
						</section>
						<section className="add-company">
							<h1 className="description-title">
								Додавайте компанії до нашої бази
							</h1>
							<p className="description-text">
								Допоможіть нам стати кращими, пропонуючи компанії, яких ще немає у базі. Ми зацікавлені у тому, аби наш сервіс представляв якомога більшу кількість різноманітних компаній - як лояльних до української мови, так і порушників. Зазначимо, що ви тільки пропонуєте компанію на розгляд. Після того її затверджує модератор, і система сама присвоює компанії статус лояльної/порушника на основі наявності/відсутності порушень.
							</p>
							<a className="page__button" href="/createCompany" data-ajax-dialog="createCompany" data-ajax-url="/createCompany">
								Запропонувати компанію
							</a>
						</section>
						<NewCompanies companies={this.props.newCompanies} />
						<Comments comments={this.props.comments} />
					</div>
				</div>
			</Layout>
		);
	}
}

LandingPage.defaultProps = {
	newCompanies: [],
	comments: []
}

export default LandingPage;