var App = Ember.Application.create();

/* IDEA Object for the idea page */
/* Todo: change it to dynamic one and save them in local Storage 
App.Idea = Ember.Object.create({
  title: 'Financial Aid Presentation to amend the Act',
  introduction: 'It is proposed to study grant and housing supplement for the recovery of a 15 percent penalty order increase the replacement fee the then-current interest for late payment and recovery of student financial aid months, the return back to the students use.',
  generalStatement: "The current status and proposed changes<br />Support for the month the loss of the recovery the Financial aid for students of the month the loss of the recovery the down study (65/1994) 7 b § (1099/2000). B § 7 of the Act, subsection 3 of the recovery will not return for re-use support for months, if not recovery cause incorrect payment of § 6, or in the payment of retroactive benefits. During the academic year 2010/2011 study grant was paid 295 thousand and 194 thousand housing more students with a total of EUR 772 million. The 2011 spring aids the recovery of 29 students to 294 in 2010, based on the input control. Total aid for the recovery of 36.1 million euros, of which 31.4 million was grants and 15 per cent or 4.7 million students are recovering punitive increase in fees. The average recovery in 2012 is 1232 euros, 1071 euros, plus 15 per cent increase. On average, the recovery concerns, therefore, support for the three months, when the student financial aid and housing during the academic year 2010/2011 were on average 360 ​​euros. The completion of Villa opiskeilijoilla is an average of two months without using their student graduation. It is expected that the recovery the return of the aid will be hampered by the months, above all, the most vulnerable students with their studies do not support the final stage will be used for months. Support After months of failure to return is also disproportionately punish those who have fallen by the negligence of their income incorrectly, and permanently lose tukikuukautensa without a purpose to abuse the system. Recovery of the increase in student financial aid Student financial aid provided for the recovery study (65/1994) 27 §. Law § 27 subsection 5 of the student's own income based on the recovery of specific student grant and housing supplement will be increased 15 percent, unless the government decree provided for a lower increase. The current state is justified by 15 per cent increase, a direct effect. Support the voluntary return of the student is considered to be a less costly alternative to aid recovery, as recovery does not return a month support for re-use and the amount recovered will add 15 per cent increase. Increase, the intention has been to guide the student to return too much from the support on a voluntary basis by the deadline. The increase has been a one off and not recovered, the amount so accrued interest on any other. Increase of one-off nature is also justified in some situations, the student's benefit, the potential change during the application process does not generate any other fees or interest rates. Student financial-recovery fee increase is proposed to amend the solid 15 percent to default to normal. Interest Act (340/2002) with an annual penalty interest rate is 8 per cent of our proposal. The state collects punitive increase of 4.7 million a year in payments in connection with recovery. Increase in the governance of payment compared to the normal charging interest for late payment is no specific evidence. Assumption has been that the punitive 15 per cent increase in fee would act as a deterrent student intentionally too much to raise the students' undesirable behavior. It is however possible that a big part of too many months to raise the subsidy is not due to intentional misconduct, in which case the increase deterrent effect of punishment is questionable or even harmful. In 2012, more than 5,000 students applied for the recovery of enforcement through. Other legal actions arising out aihetuville interest rates is the interest rate on the upper limit of the law, and there is no justifiable reason to depart from the case law students. In addition, a fixed 15 percent interest rate does not take into account the fair interest rate changes. Drafting the proposal of the European Central Bank's key interest rate is determined by only 1.0 per cent when this article is adopted (December 2000) the key interest rate was 4.75%. The goal is to bring students and student financial aid and housing allowance of recovery as an equal and compatible with other citizens and their right to their actions with the payment delay or omission.",
  expertOpinions: 'no opinions uploaded yet'
});
*/
App.Pages = Ember.Object.create({
	page: [
		{	//index 0
			id: 'ideas',
			title: 'Actual Ideas'
		},
		{	//index 1
			id: 'dashboard',
			title: 'Dashboard'
		},
		{	//index 2
			id: 'home',
			title: 'Open Ministry'
		},
		{	//index 3
			id: 'settings',
			title: 'Settings'
		},
		{	//index 4
			id: 'how',
			title: 'How does it work?'
		}
	]
})

/* Load dynamic list of ideas from REST Service */
//App.ideasController = Ember.ArrayController.create();

/*
$.get('http://am-mobile-testing.herokuapp.com/ideas.json', function(data) {
  App.ideasController.set('content', data);
});
*/

/* TEST AREA EMBER-DATA.JS */

App.adapter = DS.RESTAdapter.create({
  findAll: function(store, type) {
      var url = type.url;
      jQuery.getJSON(url, function(data) {
          var ids = data.map(function(item, index, self){ return item.id });
          store.loadMany(type, ids, data);
      });
  },
  ajax: function(url, type, hash) {
    var success = hash.success, self = this;

    console.log(url);
    console.log(type);

    if (success) {
      hash.success = function(json) {
        success.call(self, json);
      };
    }
  },
  find: function(store, type, id) {
        var url = type.url;
        url = url.fmt(id);

		console.log(url);

        jQuery.getJSON(url, function(data) {
            // data is a Hash of key/value pairs. If your server returns a
            // root, simply do something like:
            // store.load(type, id, data.person)
            store.load(type, id, data);
        });
    }
});

App.store = DS.Store.create({
	revision: 3,
	adapter: App.adapter
});

App.Idea = DS.Model.extend({
    author_id: DS.attr('string'),
    body: DS.attr('string'),
    created_at: DS.attr('date'),
    id: DS.attr('string'),
    publish_state: DS.attr('string'),
    slug: DS.attr('string'),
    state: DS.attr('string'),
    summary: DS.attr('string'),
    title: DS.attr('string'),
	updated_at: DS.attr('date'),
	shortUpdatedAt: function() {
		var string = this.get('updated_at');
		string = string.substring(0,10);
		return string;
	}.property('updated_at'),
	didLoad: function(){
    	//alert("I loaded " + this.get('id'));
    }
});

App.Idea.reopenClass({
    url: 'http://localhost:4567/ideas.json'
});

App.allIdeas = App.store.findAll(App.Idea);

/*
App.ideasController = Em.ArrayController.create({
    init: function() {
        this.set('content', App.store.findAll(App.Idea));
    }
});
App.idea1 = App.store.find(App.Idea,1);
*/
console.log(App.allIdeas);
