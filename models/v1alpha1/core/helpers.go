package core

import "github.com/gofrs/uuid"

func ResolvedAliasFromNonResolved(nonResolved NonResolvedAlias, resolvedParentId uuid.UUID, resolvedField []string) ResolvedAlias {

	return ResolvedAlias{
		AliasComponentId:      nonResolved.AliasComponentId,
		ImmediateParentId:     nonResolved.ImmediateParentId,
		ImmediateRefFieldPath: nonResolved.ImmediateRefFieldPath,
		RelationshipId:        nonResolved.RelationshipId,
		ResolvedParentId:      resolvedParentId,
		ResolvedRefFieldPath:  resolvedField,
	}
}
