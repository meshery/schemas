package plan

func (*Plan) EventCategory() string {
	return "plan"
}

var TeamDesignerOrGreater = []PlanName{PlanNameTeamDesigner, PlanNameEnterprise}
var TeamOperatorOrGreater = []PlanName{PlanNameTeamOperator, PlanNameEnterprise}
var PersonalOrGreater = []PlanName{PlanNameFree, PlanNameTeamDesigner, PlanNameTeamOperator, PlanNameEnterprise}
var TeamDesignerOrOperatorOrGreater = []PlanName{PlanNameTeamDesigner, PlanNameTeamOperator, PlanNameEnterprise}
var AnyTeamPlan = []PlanName{PlanNameTeamDesigner, PlanNameTeamOperator, PlanNameEnterprise}
var EnterpriseOnly = []PlanName{PlanNameEnterprise}
